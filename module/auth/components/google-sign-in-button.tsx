import { supabase } from "@/integrations/supabase/supabase";
import { APP_COLORS } from "@/lib/consts";
import { verifyAndRegisterDevice } from "@/lib/deviceVerification";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  Text,
  TouchableOpacity,
} from "react-native";
import { toast } from "sonner-native";

export default function GoogleSignInButton() {
  const [loading, setLoading] = useState(false); // ✅ loading state

  const signIn = async () => {
    if (loading) return;
    try {
      setLoading(true); // ✅ start loading

      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        if (response.data.idToken) {
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: response.data.idToken,
          });

          if (error) {
            console.error(error.message);
            toast.error("Error occurred. Try again");
            return;
          }

          const userId = data.user?.id;
          if (!userId) return;

          const isVerified = await verifyAndRegisterDevice(userId);

          if (!isVerified) {
            await supabase.auth.signOut();
            toast.error("This account is registered on a different device.", {
              action: {
                label: "Contact Support",
                onClick: () => Linking.openURL("mailto:support@yourapp.com"),
              },
              actionButtonStyle: { backgroundColor: APP_COLORS.primary },
              actionButtonTextStyle: { color: "#FFFFFF" },
            });
            return;
          }
        }
      } else {
        toast.error("Sign in was cancelled");
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.error(error.message);
            toast.error("Play services not available");
            break;
          default:
            console.error(error.message);
            toast.error("Error occurred. Try again");
        }
      } else {
        console.error(
          error instanceof Error ? error.message : "An error occurred",
        );
        toast.error("Error occurred. Try again");
      }
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <TouchableOpacity
      onPress={signIn}
      disabled={loading} // ✅ disable while loading
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#dbdbdb",
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        opacity: loading ? 0.7 : 1, // ✅ dimmed while loading
      }}
      activeOpacity={1}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color="#757575"
          style={{ marginRight: 10 }}
        />
      ) : (
        <Image
          source={require("@/assets/google-logo.png")}
          style={{ width: 24, height: 24, marginRight: 10 }}
        />
      )}
      <Text
        style={{
          fontSize: 16,
          color: "#757575",
          fontFamily: "Roboto-Regular",
          fontWeight: "500",
        }}
      >
        {loading ? "Signing in..." : "Sign in with Google"}
      </Text>
    </TouchableOpacity>
  );
}
