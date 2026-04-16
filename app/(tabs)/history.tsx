import ProfileHeader from "@/components/profile-header";
import TripHistory from "@/module/trip/components/TripHistory";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

const HistoryScreen = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView className="flex-1 bg-background px-3 pt-2" edges={["top"]}>
      <ProfileHeader pageName={t("history.profile_title")} showDate />
      <TripHistory />
    </SafeAreaView>
  );
};

export default HistoryScreen;
