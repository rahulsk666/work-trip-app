import { APP_COLORS } from "@/lib/consts";
import { getLocalDate } from "@/lib/date";
import { formatDate } from "@/lib/fomatDate";
import { useUserQuery } from "@/module/profile/hooks";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Avatar from "./Avatar";
import StatusBadge from "./StatusBadge";
import { IconSymbol } from "./ui/icon-symbol";

interface ProfileHeaderProps {
  pageName?: string;
  showOnline?: boolean;
  // logoName?: string;
  OnlineStatus?: boolean;
  showDate?: boolean;
  ShowSettings?: boolean;
  ShowSynced?: boolean;
  synced?: boolean;
  ParentDivClassName?: string;
  showAvatar?: boolean;
}

const ProfileHeader = ({
  pageName,
  showOnline = false,
  showDate = false,
  OnlineStatus,
  ShowSettings = false,
  ShowSynced = false,
  synced = false,
  ParentDivClassName,
  showAvatar = true,
}: ProfileHeaderProps) => {
  const { data: user } = useUserQuery();
  return (
    <View
      className={`flex-row justify-between items-center m-2 $ ${ParentDivClassName}`}
    >
      {/* Profile */}
      <View className="flex-row items-center gap-3 flex-1 p-2">
        {showAvatar && <Avatar uri={user?.avatar_url} />}
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
              <Text className="text-textSecondary text-xs font-semibold">
                {formatDate(new Date(getLocalDate()))}
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* Settings */}
      {ShowSettings && (
        <TouchableOpacity
          className="bg-cardElevated p-2 rounded-full items-center justify-center"
          activeOpacity={0}
          onPress={() => router.navigate("/(tabs)/settings")}
        >
          <IconSymbol name="gearshape" color={"white"} />
        </TouchableOpacity>
      )}

      {/* Status */}
      {ShowSynced && (
        <StatusBadge
          label={synced ? "synced" : "offline"}
          logoType="icon"
          iconName={synced ? "cloud-done" : "cloud-offline"}
          color={synced ? APP_COLORS.success : APP_COLORS.textMuted}
          borderColor={synced ? APP_COLORS.success : APP_COLORS.textMuted}
          textColor={synced ? APP_COLORS.success : APP_COLORS.textMuted}
          classname={
            synced
              ? "bg-success/10  border-success/30"
              : "bg-textMuted/10  border-textMuted/30"
          }
        />
      )}
    </View>
  );
};

export default ProfileHeader;
