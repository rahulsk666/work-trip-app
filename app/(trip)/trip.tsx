import ProfileHeader from "@/components/profile-header";
import StartTripForm from "@/module/dashboard/components/StartTripForm";
import VehicleStatusCard from "@/module/trip/components/VehicleStatusCard";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Trip = () => {
  const [startTripOpen, setStartTripOpen] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ProfileHeader pageName="Daily Trip Tracker" showOnline OnlineStatus />
      <StartTripForm />
    </SafeAreaView>
  );
};

export default Trip;
