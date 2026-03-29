import ProfileHeader from "@/components/profile-header";
import StopTripForm from "@/module/trip/components/StopTripForm";
import { useLatestTripQuery } from "@/module/trip/hooks";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Trip = () => {
  const { data: trip } = useLatestTripQuery();
  return (
    <SafeAreaView className="flex-1 bg-background m-2">
      <ProfileHeader
        pageName={"Stop Trip"}
        showOnline={trip ? false : true}
        OnlineStatus
        ShowSettings
        showDate={trip ? true : false}
      />
      <StopTripForm />
    </SafeAreaView>
  );
};

export default Trip;
