import { AuthContext } from "@/hooks/use-auth-context";
import { supabase } from "@/integrations/supabase/supabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Session } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { PropsWithChildren, useEffect, useState } from "react";
import { toast } from "sonner-native";

export default function AuthProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkWhitelistAndAuthLinking = async (session: Session) => {
      const email = session.user.email;

      if (!email) {
        await supabase.auth.signOut();
        toast.error("No email found for this account.");
        setIsLoading(false);
        return;
      }

      const { data: userRecord, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email.toLowerCase())
        .maybeSingle();

      if (error || !userRecord) {
        await GoogleSignin.signOut();
        await supabase.auth.signOut();
        toast.error(
          "Access denied. You are not authorized to use this application.",
        );
        setIsLoading(false);
        return;
      }

      if (userRecord.role === "EMPLOYEE" && !userRecord.is_active) {
        await GoogleSignin.signOut();
        await supabase.auth.signOut();
        toast.error("Your employee account is inactive.");
        setIsLoading(false);
        return;
      }

      const { data } = await supabase.auth.getUser();

      if (!userRecord.auth_user_id) {
        await supabase
          .from("users")
          .update({ auth_user_id: data?.user?.id })
          .eq("email", data?.user?.email);
      }

      if (!userRecord.avatar_url) {
        await supabase
          .from("users")
          .update({ avatar_url: data?.user?.user_metadata.avatar_url })
          .eq("email", data?.user?.email);
      }

      const { data: profileData } = await supabase
        .from("users")
        .select("*")
        .eq("auth_user_id", session.user.id)
        .single();

      queryClient.clear();
      setProfile(profileData);
      setSession(session); // ✅ set session only here
      setIsLoading(false); // ✅ set false only after everything
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && (_event === "SIGNED_IN" || _event === "INITIAL_SESSION")) {
        checkWhitelistAndAuthLinking(session); // handles setSession and setIsLoading
      } else {
        // logged out
        queryClient.clear();
        setSession(null);
        setProfile(null);
        setIsLoading(false); // ✅ stop loading for logged out
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        profile,
        isLoggedIn: !!session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
