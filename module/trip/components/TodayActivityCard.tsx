import WorkSessionCard from "@/module/work/components/WorkSessionCard";
import { useWorkPaginatedQuery } from "@/module/work/hooks";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const TodayActivityCard = ({ tripId }: { tripId: string | null }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useWorkPaginatedQuery(tripId, 2);

  const works = data?.pages.flatMap((page) => page.data) ?? [];
  return (
    <View className="flex-1 m-2 p-2  flex-col">
      <View className="flex-row justify-between">
        <Text className="text-textPrimary font-bold text-xl">
          Today&apos;s Activity
        </Text>
        <TouchableOpacity
          className="items-center justify-center"
          onPress={() => console.log("View ALl")}
          activeOpacity={1}
        >
          <Text className="text-primary">View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={works}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WorkSessionCard work={item} />}
        contentContainerStyle={{ gap: 10 }}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
        refreshing={isLoading}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TodayActivityCard;
