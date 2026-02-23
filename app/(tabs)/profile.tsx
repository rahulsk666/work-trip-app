import { IconSymbol } from "@/components/ui/icon-symbol";
import { useUserProfile } from "@/hooks/use-user";
import SignOutButton from "@/module/auth/sign-out-button";
import Avatar from "@/module/profile/Avatar";
import ProfileButton from "@/module/profile/profile-button";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const { data: user } = useUserProfile();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="mt-10 relative">
        <Avatar />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: -30,
            right: 12,
            borderRadius: "50%",
          }}
          activeOpacity={0.8}
          onPress={() => router.navigate("/(profile)/edit-profile")}
          className="rounded-full items-center justify-center"
        >
          <IconSymbol
            name="pencil.tip"
            size={24}
            color="#fff"
            style={{
              backgroundColor: "#162635",
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#0B1620",
              padding: 6,
            }}
          />
        </TouchableOpacity>
      </View>
      <View className="flex mt-3 items-center justify-center">
        <Text className="text-textPrimary text-3xl">{user?.name}</Text>
        <View className="flex-row gap-1 mt-1 justify-center items-center">
          <Text className="text-textMuted text-sm">{user?.email}</Text>
          {user?.phone && (
            <>
              <Text className="text-textMuted text-sm">|</Text>
              <Text className="text-textMuted text-sm">{user?.phone}</Text>
            </>
          )}
        </View>
        <Text className="text-sm text-primary">{user?.role}</Text>
      </View>
      <View className="flex-1 mx-6 mt-10 mb-6 gap-6">
        <ProfileButton
          text="Notifications"
          mutedText="View all notifications"
          onPress={() => console.log("'Notification")}
        />
        <ProfileButton
          text="Language"
          mutedText="English"
          onPress={() => console.log("Language")}
        />
      </View>
      <View className="mx-6">
        <SignOutButton />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
