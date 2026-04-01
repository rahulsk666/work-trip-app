import ProfileHeader from "@/components/profile-header";
import TripHistory from "@/module/trip/components/TripHistory";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const HistoryScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-background px-3 pt-2" edges={["top"]}>
      <ProfileHeader pageName="Previous Trips" showDate ShowSettings />
      <TripHistory />
    </SafeAreaView>
  );
};

export default HistoryScreen;
