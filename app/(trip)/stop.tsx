import ProfileHeader from "@/components/profile-header";
import StopTripForm from "@/module/trip/components/StopTripForm";
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
        pageName={t("trip_form.profile_end_title")}
        showOnline={trip ? false : true}
        OnlineStatus
        showDate={trip ? true : false}
      />
      <StopTripForm />
    </SafeAreaView>
  );
};

export default Trip;
