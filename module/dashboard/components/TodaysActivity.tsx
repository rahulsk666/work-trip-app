import TitleLabel from "@/components/title-label";
import { APP_COLORS } from "@/lib/consts";
import { calculateDuration } from "@/lib/duration";
import { useTodayTripQuery } from "@/module/trip/hooks";
import React from "react";
import { View } from "react-native";
import StatCard from "./StatCard";

const TodaysActivity = () => {
  const { data: trip } = useTodayTripQuery();

  const duration = trip
    ? calculateDuration(trip.start_time, trip.end_time, trip.trip_date)
    : null;

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
          label="Hours"
          color={trip ? APP_COLORS.primary : APP_COLORS.textMuted}
          disableShadow={trip ? false : true}
          value={duration ? duration.short : "0h 00m"}
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
