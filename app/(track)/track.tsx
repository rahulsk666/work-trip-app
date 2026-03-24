import Loading from "@/components/Loading";
import ProfileHeader from "@/components/profile-header";
import StatusBadge from "@/components/StatusBadge";
import { APP_COLORS } from "@/lib/consts";
import TodayActivityCard from "@/module/trip/components/TodayActivityCard";
import TripSessionCard from "@/module/trip/components/TripSessionCard";
import { useLatestTripQuery } from "@/module/trip/hooks";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Trip = () => {
  const { isLoading } = useLatestTripQuery();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <SafeAreaView className="flex-1 bg-background m-2">
      <ProfileHeader pageName="Work Tracker" ShowSettings showDate />
      <TripSessionCard />
      <View className="flex-row justify-start items-center gap-3 m-2 p-2">
        <StatusBadge
          label="GPS LOCKED"
          logoType="icon"
          iconName="lock-closed"
          color={APP_COLORS.successDark}
          textColor={APP_COLORS.textSecondary}
          borderColor={APP_COLORS.textSecondary}
        />
        <StatusBadge
          label="DATA SYNCED"
          logoType="icon"
          iconName="cloud-done"
          color={APP_COLORS.primaryDark}
          textColor={APP_COLORS.textSecondary}
          borderColor={APP_COLORS.textSecondary}
          classname="text-xl"
        />
      </View>
      <TodayActivityCard />
    </SafeAreaView>
  );
};

export default Trip;
