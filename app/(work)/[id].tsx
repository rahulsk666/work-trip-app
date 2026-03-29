import Loading from "@/components/Loading";
import ProfileHeader from "@/components/profile-header";
import WorkDetailCard from "@/module/work/components/WorkDetailCard";
import { useWorkByIdQuery } from "@/module/work/hooks";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const WorkDetailScreen = () => {
  const { id, index } = useLocalSearchParams<{
    id: string;
    index: string;
  }>();
  const { data: work, isLoading } = useWorkByIdQuery(id);

  if (!work || isLoading) {
    return <Loading label="Loading work details..." />;
  }
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ProfileHeader pageName="Work Detail" ShowSettings />
      <WorkDetailCard work={work} index={index} />
    </SafeAreaView>
  );
};

export default WorkDetailScreen;
