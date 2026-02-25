import Dialog from "@/components/dialog";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useUserProfile } from "@/hooks/use-user";
import SignOutButton from "@/module/auth/sign-out-button";
import Avatar from "@/module/profile/Avatar";
import LanguageButton from "@/module/profile/LanguageButton";
import ProfileButton from "@/module/profile/ProfileButton";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const flags = [
  { language: "English", country: "us" },
  { language: "German", country: "ge" },
  { language: "Japanese", country: "jp" },
];

const ProfileScreen = () => {
  const { data: user } = useUserProfile();
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState("English");
  const handleLanguage = (value: string) => {
    setLanguage(value);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="mt-10 relative">
        <Avatar user={user} />
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
          onPress={() => setVisible(true)}
        />
      </View>
      <View className="mx-6">
        <SignOutButton />
      </View>
      <Dialog modalVisible={visible} onRequestClose={() => setVisible(false)}>
        {/* <Text
          style={{
            color: "#E6EDF3",
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 8,
          }}
        >
          Title
        </Text>
        <Text style={{ color: "#9FB3C8", marginBottom: 24 }}>
          Are you sure you want to do this?
        </Text>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#1F3446",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#E6EDF3" }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              backgroundColor: "#2D8CFF",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>Confirm</Text>
          </TouchableOpacity>
        </View> */}
        <FlatList
          data={flags}
          keyExtractor={(item) => item.country}
          renderItem={({ item }) => (
            <LanguageButton
              language={item.language}
              country={item.country}
              handleLanguage={handleLanguage}
              active={language === item.language}
            />
          )}
          className=""
        />
        {/* <LanguageButton language="English" country={"us"} /> */}
      </Dialog>
    </SafeAreaView>
  );
};

export default ProfileScreen;
