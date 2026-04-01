import { IconSymbol } from "@/components/ui/icon-symbol";
import { useDuration } from "@/hooks/useDuration";
import { APP_COLORS } from "@/lib/consts";
import { formatTime } from "@/lib/formatTime";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Work } from "../schemas/work.schema";

interface WorkSessionCardProps {
  work: Work;
  index: number;
}

const WorkSessionCard = ({ work, index }: WorkSessionCardProps) => {
  const duration = useDuration(work.start_time, work.end_time, work.created_at);
  const formattedIndex = String(Number(index) + 1).padStart(3, "0");
  return (
    <TouchableOpacity
      className="bg-card p-2 m-1 gap-2 rounded-lg flex-col justify-center"
      activeOpacity={1}
      onPress={() =>
        router.navigate({
          pathname: "/(work)/[id]",
          params: { id: work.id, index: index },
        })
      }
    >
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
          <Text className="text-xl font-bold text-textPrimary">
            #{formattedIndex}
          </Text>
        </View>
        <View
          className="flex-row justify-center items-center rounded-lg p-1 gap-1 m-1"
          style={{
            backgroundColor:
              work.status === "ENDED"
                ? APP_COLORS.successShadow
                : APP_COLORS.primaryShadow,
            paddingHorizontal: 4,
            borderRadius: 4,
            marginTop: 8,
            // height: "50%",
          }}
        >
          <Ionicons
            name="checkmark-circle"
            size={12}
            color={
              work.status === "ENDED"
                ? APP_COLORS.successDark
                : APP_COLORS.primaryDark
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
    </TouchableOpacity>
  );
};

export default WorkSessionCard;
