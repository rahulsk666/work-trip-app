import { AuthContext } from "@/hooks/use-auth-context";
import { supabase } from "@/integrations/supabase/supabase";
import type { Session } from "@supabase/supabase-js";
import { PropsWithChildren, useEffect, useState } from "react";
import { Alert } from "react-native";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch the session once, and subscribe to auth state changes
  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
      }

      setSession(session);
      setIsLoading(false);
    };

    fetchSession();

    const checkWhitelistAndAuthLinking = async (session: Session) => {
      setIsLoading(true);
      const email = session.user.email;

      // Safety check
      if (!email) {
        await supabase.auth.signOut();
        Alert.alert("No email found for this account.");
        return;
      }

      const { data: userRecord, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email.toLowerCase())
        .maybeSingle();

      // ❌ DB error or user not found → deny
      if (error || !userRecord) {
        await supabase.auth.signOut();
        Alert.alert(
          "Access denied. You are not authorized to use this application.",
        );
        setIsLoading(false);
        return;
      }

      if (userRecord.role === "EMPLOYEE" && !userRecord.is_active) {
        await supabase.auth.signOut();
        Alert.alert("Your employee account is inactive.");
        setIsLoading(false);
        return;
      }

      const { data } = await supabase.auth.getUser();

      // Auth Linking
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
      // ✅ Allowed (ADMIN or active EMPLOYEE)
      setIsLoading(false);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && (_event === "SIGNED_IN" || _event === "INITIAL_SESSION")) {
        checkWhitelistAndAuthLinking(session);
      }
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch the profile when the session changes
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);

      if (session) {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("auth_user_id", session.user.id)
          .single();

        setProfile(data);
      } else {
        setProfile(null);
      }

      setIsLoading(false);
    };

    fetchProfile();
  }, [session]);

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
