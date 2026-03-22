import ProfileHeader from "@/components/profile-header";
import StartTripForm from "@/module/dashboard/components/StartTripForm";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Trip = () => {
  return (
    <SafeAreaView className="flex-1 bg-background m-2">
      <ProfileHeader
        pageName="Daily Trip Tracker"
        showOnline
        OnlineStatus
        ShowSettings
      />
      <StartTripForm />
    </SafeAreaView>
  );
};

export default Trip;
