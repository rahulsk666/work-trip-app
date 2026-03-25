import { IconSymbol } from "@/components/ui/icon-symbol";
import { APP_COLORS } from "@/lib/consts";
import { calculateDuration } from "@/lib/duration";
import { formatDate } from "@/lib/fomatDate";
import { formatTime } from "@/lib/formatTime";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { Trip } from "../schemas/trip.schema";

interface WorkSessionCardProps {
  trip: Trip;
}

const TripCard = ({ trip }: WorkSessionCardProps) => {
  const duration = trip?.start_time
    ? calculateDuration(trip.start_time, trip.end_time, trip?.trip_date)
    : null;

  return (
    <View className="bg-card p-2 m-1 gap-2 rounded-lg flex-col justify-center">
      <View className="flex-row justify-between">
        <View className="flex-row justify-start items-center gap-2">
          <View
            className="items-center rounded-md"
            style={{
              backgroundColor: APP_COLORS.primaryShadow,
              borderRadius: 5,
              padding: 3,
            }}
          >
            <IconSymbol
              size={28}
              name="clock.arrow.circlepath"
              color={APP_COLORS.primary}
            />
          </View>
          <Text className="text-lg font-bold text-textPrimary">
            {formatDate(trip.trip_date, { showYear: true })}
          </Text>
        </View>
        <View
          className="flex-row justify-center items-center gap-1 m-1"
          style={{
            backgroundColor: trip.end_time
              ? APP_COLORS.successShadow
              : APP_COLORS.primaryShadow,
            paddingHorizontal: 3,
            borderRadius: 4,
            marginTop: 8,
            height: "50%",
          }}
        >
          <Ionicons
            name="checkmark-circle"
            size={12}
            color={
              trip.status === "ENDED"
                ? APP_COLORS.successDark
                : APP_COLORS.primary
            }
          />
          <Text
            className="text-sm font-semibold"
            style={{
              color:
                trip.status === "ENDED"
                  ? APP_COLORS.successDark
                  : APP_COLORS.primaryDark,
            }}
          >
            {trip.status === "ENDED" ? "Completed" : "In Progress"}
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between p-2">
        <View className="flex-col gap-2 justify-start">
          <Text className="text-textSecondary font-bold">TIME</Text>
          <Text className="text-textSecondary font-bold">
            {trip?.start_time ? formatTime(trip.start_time) : "00:00 AM"}
            {trip?.end_time && trip.status === "ENDED"
              ? ` - ${formatTime(trip.end_time)}:`
              : " - 00:00 AM"}
          </Text>
        </View>
        <View className="flex-col gap-2 justify-start">
          <Text className="text-textSecondary font-bold">DURATION</Text>
          <Text className="text-textSecondary font-bold">
            {duration?.formatted ?? "00h 00m"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TripCard;
