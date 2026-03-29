import WorkSessionCard from "@/module/work/components/WorkSessionCard";
import { useWorkByLimitQuery } from "@/module/work/hooks";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const TodayActivityCard = ({ tripId }: { tripId: string }) => {
  const { data: works } = useWorkByLimitQuery({ tripId: tripId, limit: 2 });

  return (
    <View className="flex-1 mx-2 p-2  flex-col">
      <View className="flex-row justify-between">
        <Text className="text-textPrimary font-bold text-xl">
          Today&apos;s Activity
        </Text>
        <TouchableOpacity
          className="items-center justify-center"
          onPress={() => router.navigate(`/(trip)/${tripId}`)}
          activeOpacity={1}
        >
          <Text className="text-primary">View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        className="mt-2"
        data={works}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <WorkSessionCard work={item} index={index} />
        )}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

export default TodayActivityCard;
