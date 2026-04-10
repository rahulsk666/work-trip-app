import Loading from "@/components/Loading";
import ProfileHeader from "@/components/profile-header";
import ReceiptDetailCard from "@/module/receipt/components/ReceiptDetailCard";
import { useReceiptByIdQuery } from "@/module/receipt/hooks";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const ReceiptDetailScreen = () => {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{
    id: string;
  }>();
  const { data: receipt, isLoading } = useReceiptByIdQuery(id);

  if (!receipt || isLoading) {
    return <Loading label={t("receipt_detail.loading_receipt")} />;
  }

  return (
    <View className="flex-1 bg-background px-3 pt-5">
      <ProfileHeader pageName={t("receipt_detail.profile_title")} />
      <ReceiptDetailCard receipt={receipt} />
    </View>
  );
};

export default ReceiptDetailScreen;
