import ProfileHeader from "@/components/profile-header";
import StartTripForm from "@/module/trip/components/StartTripForm";
import { useLatestTripQuery } from "@/module/trip/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

const Trip = () => {
  const { t } = useTranslation();
  const { data: trip } = useLatestTripQuery();
  return (
    <SafeAreaView className="flex-1 bg-background p-1">
      <ProfileHeader
        pageName={t("trip_form.profile_start_title")}
        showOnline={trip ? false : true}
        OnlineStatus
        showDate={trip ? true : false}
      />
      <StartTripForm />
    </SafeAreaView>
  );
};

export default Trip;
