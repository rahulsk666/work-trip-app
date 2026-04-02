import Loading from "@/components/Loading";
import ProfileHeader from "@/components/profile-header";
import ReceiptDetailCard from "@/module/receipt/components/ReceiptDetailCard";
import { useReceiptByIdQuery } from "@/module/receipt/hooks";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

const ReceiptDetailScreen = () => {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();
  const { data: receipt, isLoading } = useReceiptByIdQuery(id);

  if (!receipt || isLoading) {
    return <Loading label="Loading Receipt..." />;
  }

  return (
    <View className="flex-1 bg-background px-3 pt-5">
      <ProfileHeader pageName="Receipt Detail" ShowSettings />
      <ReceiptDetailCard receipt={receipt} />
    </View>
  );
};

export default ReceiptDetailScreen;
