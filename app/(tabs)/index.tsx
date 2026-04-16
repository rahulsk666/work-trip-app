import Loading from "@/components/Loading";
import ProfileHeader from "@/components/profile-header";
import { useLocationTracking } from "@/hooks/useLocationTracking";
import DashboardActions from "@/module/dashboard/components/DashboardActions";
import DutyInfo from "@/module/dashboard/components/DutyInfo";
import QuickTools from "@/module/dashboard/components/QuickTools";
import { useUserQuery } from "@/module/profile/hooks";
import { useLatestTripQuery } from "@/module/trip/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const { t } = useTranslation();
  const { data: user } = useUserQuery();
  const { data: latestTrip, isLoading } = useLatestTripQuery();
  useLocationTracking(latestTrip?.id ?? null);

  if (isLoading || latestTrip === undefined) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      className="flex-1 bg-background"
      style={{ paddingHorizontal: 12 }}
      edges={["top"]}
    >
      {/* Header */}
      <ProfileHeader
        pageName={t("dashboard.profile_title", { name: user?.name })}
        showDate
        ShowSynced
        synced={!!isLoading ? false : !!latestTrip}
        ParentDivClassName="mx-0"
      />
      <ScrollView
        style={{ flex: 1 }} // ✅ fills remaining space
        contentContainerStyle={{ flexGrow: 1, padding: 5 }} // ✅ content stretches to fill
        showsVerticalScrollIndicator={false}
      >
        <DutyInfo />
        <QuickTools disabled={latestTrip ? false : true} />
        <DashboardActions />
      </ScrollView>
    </SafeAreaView>
  );
}
