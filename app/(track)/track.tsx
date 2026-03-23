import ProfileHeader from "@/components/profile-header";
import TripSessionCard from "@/module/trip/components/TripSessionCard";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Trip = () => {
  return (
    <SafeAreaView className="flex-1 bg-background m-2">
      <ProfileHeader pageName="Work Tracker" ShowSettings showDate />
      <TripSessionCard />
    </SafeAreaView>
  );
};

export default Trip;
