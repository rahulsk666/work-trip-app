import ProfileHeader from "@/components/profile-header";
import ReceiptForm from "@/module/receipt/components/ReceiptForm";
import { useLatestTripQuery } from "@/module/trip/hooks";
import React from "react";
import { View } from "react-native";

const Receipt = () => {
  const { data: trip } = useLatestTripQuery();

  return (
    <View className="flex-1 bg-background px-3 pt-5">
      <ProfileHeader pageName="Add Receipt" ShowSettings />
      <ReceiptForm tripId={trip?.id} />
    </View>
  );
};

export default Receipt;
