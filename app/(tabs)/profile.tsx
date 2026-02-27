import Avatar from "@/components/Avatar";
import Dialog from "@/components/Dialog";
import ProfileButton from "@/components/MenuButton";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { APP_COLORS } from "@/lib/consts";
import SignOutButton from "@/module/auth/sign-out-button";
import LanguagePicker from "@/module/profile/components/LanguagePicker";
import { useUserQuery } from "@/module/profile/hooks";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const { data: user } = useUserQuery();
  const { t } = useTranslation();

  const [languageModalOpen, setLanguageModalOpen] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="mt-10 relative">
        <Avatar uri={user?.avatar_url} />
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
            color={APP_COLORS.white}
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
          text={t("profile.notifications")}
          mutedText={t("profile.notifications_subtitle")}
          onPress={() => console.log("'Notification")}
        />
        <ProfileButton
          text={t("profile.language")}
          mutedText={t("profile.language_current")}
          onPress={() => setLanguageModalOpen(true)}
        />
      </View>
      <View className="mx-6">
        <SignOutButton />
      </View>
      <Dialog
        open={languageModalOpen}
        onClose={() => setLanguageModalOpen(false)}
      >
        <LanguagePicker />
      </Dialog>
    </SafeAreaView>
  );
};

export default ProfileScreen;
