import { supabase } from "@/integrations/supabase/supabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

async function onSignOutButtonPress() {
  await GoogleSignin.signOut(); // ✅ sign out from Google too
  const { error } = await supabase.auth.signOut();
  router.navigate("/(auth)/login");

  if (error) {
    console.error("Error signing out:", error);
  }
}

const SignOutButton = () => {
  return (
    <TouchableOpacity
      onPress={onSignOutButtonPress}
      className="items-center p-4 bg-primary rounded-lg"
      activeOpacity={0.8}
    >
      <Text className="text-textPrimary text-lg">Sign out</Text>
    </TouchableOpacity>
  );
};

export default SignOutButton;
