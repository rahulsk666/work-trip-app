import ProfileHeader from "@/components/profile-header";
import ReceiptForm from "@/module/receipt/components/ReceiptForm";
import { useLatestTripQuery } from "@/module/trip/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const Receipt = () => {
  const { t } = useTranslation();
  const { data: trip } = useLatestTripQuery();

  return (
    <View className="flex-1 bg-background px-3 pt-5">
      <ProfileHeader pageName={t("receipt_form.profile_title")} />
      <ReceiptForm tripId={trip?.id} />
    </View>
  );
};

export default Receipt;
