import { IconSymbol } from "@/components/ui/icon-symbol";
import { APP_COLORS } from "@/lib/consts";
import { calculateDuration } from "@/lib/duration";
import { formatTime } from "@/lib/formatTime";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { Work } from "../schemas/work.schema";

interface WorkSessionCardProps {
  work: Work;
}

const WorkSessionCard = ({ work }: WorkSessionCardProps) => {
  const duration =
    work.start_time && work.end_time
      ? calculateDuration(work.start_time, work.end_time)
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
            Work Activity
          </Text>
        </View>
        <View
          className="flex-row justify-center items-center gap-1 m-1"
          style={{
            backgroundColor:
              work.status === "ENDED"
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
              work.status === "ENDED"
                ? APP_COLORS.successDark
                : APP_COLORS.primary
            }
          />
          <Text
            className="text-sm font-semibold"
            style={{
              color:
                work.status === "ENDED"
                  ? APP_COLORS.successDark
                  : APP_COLORS.primaryDark,
            }}
          >
            {work.status === "ENDED" ? "Completed" : "In Progress"}
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between p-2">
        <View className="flex-col gap-2 justify-start">
          <Text className="text-textSecondary font-bold">TIME</Text>
          <Text className="text-textSecondary font-bold">
            {work.start_time && formatTime(work?.start_time)}
            {work.start_time && work.end_time
              ? ` - ${formatTime(work.end_time)}`
              : ""}
          </Text>
        </View>
        <View className="flex-col gap-2 justify-center">
          <Text className="text-textSecondary font-bold">DURATION</Text>
          <Text
            className="text-textSecondary font-bold rounded-lg text-center p-1"
            style={{
              backgroundColor: APP_COLORS.successShadow,
              color: APP_COLORS.successDark,
              textAlign: "center",
            }}
          >
            {duration?.short ?? "00h 00m"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WorkSessionCard;
