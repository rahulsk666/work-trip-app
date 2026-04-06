import ProfileHeader from "@/components/profile-header";
import AccidentForm from "@/module/accident/components/AccidentForm";
import { useLatestTripQuery } from "@/module/trip/hooks";
import React from "react";
import { View } from "react-native";

const Accident = () => {
  const { data: trip } = useLatestTripQuery();

  return (
    <View className="flex-1 bg-background px-3 pt-5">
      <ProfileHeader pageName="Report Accident" />
      <AccidentForm tripId={trip?.id} />
    </View>
  );
};

export default Accident;
