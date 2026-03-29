import { useDuration } from "@/hooks/useDuration";
import { APP_COLORS } from "@/lib/consts";
import { formatTime } from "@/lib/formatTime";
import React from "react";
import { Text, View } from "react-native";

interface WorkDetailCardProps {
  startTime?: string;
  endTime?: string | null;
  workDate?: string | null;
}

const WorkDetailCard = ({
  startTime,
  endTime,
  workDate,
}: WorkDetailCardProps) => {
  const duration = useDuration(startTime ?? "", endTime, workDate);
  return (
    <View className="bg-card rounded-xl" style={{ padding: 10, margin: 15 }}>
      <View className="flex-col justify-start gap-6 p-2">
        <Text className="text-textPrimary text-xl font-bold">Work metrics</Text>
        <View className="flex-col gap-2">
          <Text className="text-textPrimary">Duration</Text>
          <Text
            className="text-5xl font-bold"
            style={{ color: APP_COLORS.successDark }}
          >
            {duration?.short ?? "00h 00m"}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <View className="flex-col gap-2 items-center">
            <Text className="text-textPrimary">Work Start Time</Text>
            <Text className="text-center text-textPrimary text-lg font-bold">
              {startTime ? formatTime(startTime) : ""}
            </Text>
          </View>
          <View className="flex-col gap-2 items-center">
            <Text className="text-textPrimary">Work End Time</Text>
            <Text className="text-center text-textPrimary text-lg font-bold">
              {endTime ? formatTime(endTime) : ""}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WorkDetailCard;
