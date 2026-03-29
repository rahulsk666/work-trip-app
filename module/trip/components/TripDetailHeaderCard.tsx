import { useDuration } from "@/hooks/useDuration";
import { calculateTotalWorkTime } from "@/lib/calaculateWork";
import { formatDate } from "@/lib/fomatDate";
import { formatTime } from "@/lib/formatTime";
import { useWorkByTripQuery } from "@/module/work/hooks";
import React from "react";
import { Text, View } from "react-native";
import { Trip } from "../schemas/trip.schema";

const TripDetailHeaderCard = ({ trip }: { trip?: Trip }) => {
  const duration = useDuration(
    trip?.start_time ?? "",
    trip?.end_time,
    trip?.trip_date,
  );
  const { data: works } = useWorkByTripQuery({ tripId: trip?.id });
  const totalWorks = calculateTotalWorkTime(works ?? []);
  return (
    <View className="flex-col items-center bg-cardElevated p-2 rounded-xl gap-2">
      <View>
        <Text className="text-textPrimary font-bold">
          {trip ? formatDate(trip?.trip_date) : ""}
        </Text>
      </View>
      <View>
        <Text
          className="text-textPrimary font-bold text-5xl"
          style={{ fontSize: 48, lineHeight: 52 }}
        >
          {trip ? duration?.short : "00h 00m"}
        </Text>
      </View>
      <View className="flex-row justify-between" style={{ gap: 40 }}>
        <View className="flex-col items-center justify-center">
          <Text className="text-textPrimary">Work Time</Text>
          <Text className="text-textPrimary">{totalWorks?.formatted}</Text>
        </View>
        <View className="flex-col items-center justify-center">
          <Text className="text-textPrimary">Trip Start Time</Text>
          <Text className="text-textPrimary">
            {trip ? formatTime(trip?.start_time) : "00:00 AM"}
          </Text>
        </View>
        <View className="flex-col items-center justify-center">
          <Text className="text-textPrimary">Trip End Time</Text>
          <Text className="text-textPrimary">
            {trip && trip?.end_time ? formatTime(trip?.end_time) : "00:00 AM"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TripDetailHeaderCard;
