import TitleLabel from "@/components/title-label";
import { useDuration } from "@/hooks/useDuration";
import { calculateTotalWorkTime } from "@/lib/calaculateWork";
import { APP_COLORS } from "@/lib/consts";
import { useLatestTripQuery } from "@/module/trip/hooks";
import { useWorkByTripQuery } from "@/module/work/hooks";
import React from "react";
import { View } from "react-native";
import StatCard from "./StatCard";

const TodaysActivity = () => {
  const { data: trip } = useLatestTripQuery();

  const duration = useDuration(
    trip?.start_time ?? "",
    trip?.end_time,
    trip?.trip_date,
  );

  const { data: works } = useWorkByTripQuery({ tripId: trip?.id });
  const totalWorks = calculateTotalWorkTime(works ?? []);

  const kmDriven =
    trip?.end_km && trip?.start_km
      ? (trip.end_km - trip.start_km).toFixed(1)
      : null;
  return (
    <View className="mt-5">
      <TitleLabel title="Today's Activity" />
      <View className="flex-row items-center justify-between mt-3">
        <StatCard
          icon="time"
          label="Work Hours"
          color={trip ? APP_COLORS.primary : APP_COLORS.textMuted}
          disableShadow={trip ? false : true}
          value={totalWorks?.formatted ?? "00h 00m"}
        />
        <StatCard
          icon="speedometer-sharp"
          label="Miles"
          disableShadow={trip ? false : true}
          value={kmDriven ? `${kmDriven} km` : "0 km"}
          color={trip ? APP_COLORS.purple : APP_COLORS.textMuted}
        />
      </View>
    </View>
  );
};

export default TodaysActivity;
