import ProfileHeader from "@/components/profile-header";
import StartTripForm from "@/module/trip/components/StartTripForm";
import { useLatestTripQuery } from "@/module/trip/hooks";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Trip = () => {
  const { data: trip } = useLatestTripQuery();
  return (
    <SafeAreaView className="flex-1 bg-background p-1">
      <ProfileHeader
        pageName={"Start Trip"}
        showOnline={trip ? false : true}
        OnlineStatus
        ShowSettings
        showDate={trip ? true : false}
      />
      <StartTripForm />
    </SafeAreaView>
  );
};

export default Trip;
