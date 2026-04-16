import { APP_COLORS } from "@/lib/consts";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useTripPaginatedQuery } from "../hooks";
import TripCard from "./TripCard";

const TripHistory = () => {
  const { t } = useTranslation();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useTripPaginatedQuery();

  const trips = data?.pages.flatMap((page) => page.data) ?? [];
  return (
    <View className="flex-1 mt-1 p-2 justify-center">
      <View className=" mb-4">
        <Text
          className="text-textMuted text-2xl font-bold"
          style={{ fontSize: 24, lineHeight: 32 }}
        >
          {t("history.title")}
        </Text>
      </View>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TripCard trip={item} />}
        contentContainerStyle={{ gap: 10 }}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
        ListEmptyComponent={
          <View className="items-center justify-center py-10 gap-2">
            <Ionicons
              name="map-outline"
              size={40}
              color={APP_COLORS.textMuted}
            />
            <Text className="font-poppins text-textSecondary text-sm">
              {t("history.no_history_message")}
            </Text>
          </View>
        }
        refreshing={isLoading}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TripHistory;
