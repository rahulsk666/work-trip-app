import { AuthContext } from "@/hooks/use-auth-context";
import { supabase } from "@/integrations/supabase/supabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Session } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { PropsWithChildren, useEffect, useState } from "react";
import { Linking } from "react-native";
import { toast } from "sonner-native";

import { verifyAndRegisterDevice } from "@/lib/deviceVerification";

export default function AuthProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();

  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkWhitelistAndAuthLinking = async (
      session: Session,
    ) => {
      try {
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

        if (
          userRecord.role === "EMPLOYEE" &&
          !userRecord.is_active
        ) {
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
            .update({
              auth_user_id: data?.user?.id,
            })
            .eq("email", data?.user?.email);
        }

        if (!userRecord.avatar_url) {
          await supabase
            .from("users")
            .update({
              avatar_url:
                data?.user?.user_metadata.avatar_url,
            })
            .eq("email", data?.user?.email);
        }

        const { data: profileData } = await supabase
          .from("users")
          .select("*")
          .eq("auth_user_id", session.user.id)
          .single();

        // ✅ DEVICE VERIFICATION (CRITICAL FIX)
        const isVerified =
          await verifyAndRegisterDevice(
            session.user.id,
          );

        if (!isVerified) {
          await GoogleSignin.signOut();
          await supabase.auth.signOut();

          toast.error(
            "This account is registered on a different device.",
            {
              action: {
                label: "Contact Support",
                onClick: () =>
                  Linking.openURL(
                    "mailto:support@yourapp.com",
                  ),
              },
            },
          );

          queryClient.clear();
          setSession(null);
          setProfile(null);
          setIsLoading(false);

          return; // 🚨 Prevent login
        }

        // ✅ Only allow session if verified
        queryClient.clear();
        setProfile(profileData);
        setSession(session);
        setIsLoading(false);
      } catch (err) {
        console.error("Auth check failed:", err);

        await GoogleSignin.signOut();
        await supabase.auth.signOut();

        setSession(null);
        setProfile(null);
        setIsLoading(false);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {

        // 🔹 Only verify device on SIGNED_IN
        if (_event === "SIGNED_IN" && session) {

          setIsLoading(true);

          await checkWhitelistAndAuthLinking(session);

          return;
        }

        // 🔹 App reopened with stored session
        if (_event === "INITIAL_SESSION" && session) {

          try {
            // Just restore session — no device check
            const { data: profileData } = await supabase
              .from("users")
              .select("*")
              .eq("auth_user_id", session.user.id)
              .single();

            setProfile(profileData);
            setSession(session);

          } catch (err) {

            console.error("Initial session restore failed:", err);

            await supabase.auth.signOut();

            setSession(null);
            setProfile(null);
          }

          setIsLoading(false);

          return;
        }

        // 🔹 Logged out
        queryClient.clear();
        setSession(null);
        setProfile(null);
        setIsLoading(false);
      },
    );

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