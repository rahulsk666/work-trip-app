import ProfileHeader from "@/components/profile-header";
import AccidentForm from "@/module/accident/components/AccidentForm";
import { useLatestTripQuery } from "@/module/trip/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const Accident = () => {
  const { t } = useTranslation();
  const { data: trip } = useLatestTripQuery();

  return (
    <View className="flex-1 bg-background px-3 pt-5">
      <ProfileHeader pageName={t("accident_form.profile_title")} />
      <AccidentForm tripId={trip?.id} />
    </View>
  );
};

export default Accident;
