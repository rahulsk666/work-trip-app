import { APP_COLORS } from "@/lib/consts";
import { formatDate } from "@/lib/fomatDate";
import { useUserQuery } from "@/module/profile/hooks";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Avatar from "./Avatar";
import { IconSymbol } from "./ui/icon-symbol";

interface ProfileHeaderProps {
  pageName?: string;
  showOnline?: boolean;
  logoName?: string;
  OnlineStatus?: boolean;
  showDate?: boolean;
}

const ProfileHeader = ({
  pageName,
  showOnline = false,
  showDate = false,
  OnlineStatus,
}: ProfileHeaderProps) => {
  const { data: user } = useUserQuery();
  return (
    <View className="flex-row justify-between items-center m-2">
      {/* Profile */}
      <View className="flex-row items-center gap-3 flex-1 p-2">
        <Avatar uri={user?.avatar_url} />
        <View className="flex-1">
          <Text className="text-textPrimary font-bold text-xl">
            {pageName || user?.name}
          </Text>
          <View className="flex-row items-center justify-start gap-1">
            {showOnline && (
              <>
                <IconSymbol
                  color={
                    OnlineStatus ? APP_COLORS.successDark : APP_COLORS.danger
                  }
                  name="wifi"
                  size={18}
                />
                <Text
                  className={`${OnlineStatus ? "text-successDark" : "text-danger"} text-sm font-bold`}
                >
                  {OnlineStatus ? "Online" : "Offline"}
                </Text>
              </>
            )}
            {showDate && (
              <Text className="text-textSecondary text-sm font-bold">
                {formatDate(new Date())}
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* Status */}
      <TouchableOpacity
        className="bg-cardElevated p-2 rounded-full items-center justify-center"
        activeOpacity={0}
        onPress={() => router.navigate("/(tabs)/profile")}
      >
        <IconSymbol name="gearshape" color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;
