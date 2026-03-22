import ProfileHeader from "@/components/profile-header";
import { useLocationTracking } from "@/hooks/useLocationTracking";
import DashboardActions from "@/module/dashboard/components/DashboardActions";
import DutyInfo from "@/module/dashboard/components/DutyInfo";
import QuickTools from "@/module/dashboard/components/QuickTools";
import TodaysActivity from "@/module/dashboard/components/TodaysActivity";
import { useUserQuery } from "@/module/profile/hooks";
import { useTodayTripQuery } from "@/module/trip/hooks";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const { data: user } = useUserQuery();
  const { data: todayTrip, isLoading } = useTodayTripQuery();
  useLocationTracking(todayTrip?.id ?? null);

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      {/* Header */}
      <ProfileHeader
        pageName={`Welcome back, ${user?.name}`}
        showDate
        ShowSynced
        synced={!!isLoading ? false : !!todayTrip}
        ParentDivClassName="mx-0"
      />

      <DutyInfo />
      <TodaysActivity />
      <QuickTools disabled={todayTrip ? false : true} />

      <DashboardActions />
    </SafeAreaView>
  );
}
