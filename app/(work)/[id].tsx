import AppMapView from "@/components/AppMapView";
import Loading from "@/components/Loading";
import ProfileHeader from "@/components/profile-header";
import { formatDate } from "@/lib/fomatDate";
import WorkDetailCard from "@/module/work/components/WorkDetailCard";
import { useWorkByIdQuery } from "@/module/work/hooks";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WorkDetailScreen = () => {
  const { id, index } = useLocalSearchParams<{
    id: string;
    index: string;
  }>();
  const { data: work } = useWorkByIdQuery(id);
  const formattedIndex = String(Number(index) + 1).padStart(3, "0");

  if (!work) {
    return <Loading />;
  }
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ProfileHeader pageName="Work Detail" ShowSettings />
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
      <WorkDetailCard
        startTime={work?.start_time}
        endTime={work?.end_time}
        workDate={work?.created_at ? formatDate(work?.created_at) : ""}
      />
    </SafeAreaView>
  );
};

export default WorkDetailScreen;
