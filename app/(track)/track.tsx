import Loading from "@/components/Loading";
import ProfileHeader from "@/components/profile-header";
import TodayActivityCard from "@/module/trip/components/TodayActivityCard";
import TripSessionCard from "@/module/trip/components/TripSessionCard";
import { useLatestTripQuery } from "@/module/trip/hooks";
import React from "react";
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
      <TodayActivityCard />
    </SafeAreaView>
  );
};

export default Trip;
