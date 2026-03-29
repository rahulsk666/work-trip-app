import AppMapView from "@/components/AppMapView";
import { useDuration } from "@/hooks/useDuration";
import { APP_COLORS } from "@/lib/consts";
import { formatDate } from "@/lib/fomatDate";
import { formatTime } from "@/lib/formatTime";
import React from "react";
import { Text, View } from "react-native";
import { Work } from "../schemas/work.schema";

interface WorkDetailCardProps {
  work: Work;
  index?: string;
}

const WorkDetailCard = ({ work, index }: WorkDetailCardProps) => {
  const duration = useDuration(
    work.start_time ?? "",
    work.end_time,
    work.created_at,
  );
  const formattedIndex = String(Number(index) + 1).padStart(3, "0");
  return (
    <>
      <View className="flex-col justify-start p-4">
        <Text className="text-3xl text-textMuted font-bold">
          {work?.start_time ? formatDate(work?.start_time) : ""}
        </Text>
        <Text className="text-primary text-5xl font-bold">
          #{formattedIndex}
        </Text>
      </View>
      <View className="px-4">
        <AppMapView
          mode={{ type: "static", location: work?.location }}
          height={400}
        />
      </View>
      <View className="bg-card rounded-xl" style={{ padding: 10, margin: 15 }}>
        <View className="flex-col justify-start gap-6 p-2">
          <Text className="text-textSecondary text-xl font-bold">
            WORK METRICS
          </Text>
          <View className="flex-col gap-2">
            <Text className="text-textMuted">DURATION</Text>
            <Text
              className="font-bold text-center"
              style={{
                color: APP_COLORS.successDark,
                fontSize: 48,
                lineHeight: 50,
              }}
            >
              {duration?.short ?? "00h 00m"}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <View className="flex-col gap-2 items-center">
              <Text className="text-textSecondary text-center">
                WORK START TIME
              </Text>
              <Text className="text-center text-textPrimary text-lg font-bold">
                {work.start_time ? formatTime(work.start_time) : ""}
              </Text>
            </View>
            <View className="flex-col gap-2 items-center">
              <Text className="text-textSecondary text-center">
                WORK END TIME
              </Text>
              <Text className="text-center text-textPrimary text-lg font-bold">
                {work.end_time ? formatTime(work.end_time) : ""}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default WorkDetailCard;
