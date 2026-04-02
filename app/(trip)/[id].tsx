import Loading from "@/components/Loading";
import { APP_COLORS } from "@/lib/consts";
import ReceiptCard from "@/module/receipt/components/ReceiptCard";
import { useReceiptPaginatedQuery } from "@/module/receipt/hooks";
import TripDetailHeaderCard from "@/module/trip/components/TripDetailHeaderCard";
import TripDetailTabSwitcher, {
  TripDetailTab,
} from "@/module/trip/components/TripDetailTabSwitcher";
import { useTripByIdQuery } from "@/module/trip/hooks";
import WorkSessionCard from "@/module/work/components/WorkSessionCard";
import { useWorkPaginatedQuery } from "@/module/work/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const TripDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [activeTab, setActiveTab] = useState<TripDetailTab>("Work");

  const tripId = Array.isArray(id) ? id[0] : id;

  const { data: trip, isLoading } = useTripByIdQuery(tripId);
  const {
    data: workData,
    fetchNextPage: fetchNextWork,
    hasNextPage: hasNextWork,
    isFetchingNextPage: isFetchingWork,
    isLoading: isLoadingWork,
    refetch: refetchWork,
  } = useWorkPaginatedQuery(tripId);

  const {
    data: receiptData,
    fetchNextPage: fetchNextReceipt,
    hasNextPage: hasNextReceipt,
    isFetchingNextPage: isFetchingReceipt,
    isLoading: isLoadingReceipt,
    refetch: refetchReceipt,
  } = useReceiptPaginatedQuery(tripId);

  const works = workData?.pages.flatMap((page) => page.data) ?? [];
  const receipts = receiptData?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading || !trip) {
    return <Loading label="Loading Trip details.." />;
  }

  return (
    <SafeAreaView
      className="flex-1 gap-2 bg-background flex-col"
      style={{ padding: 10 }}
    >
      <TripDetailHeaderCard activeTab={activeTab} trip={trip} />
      <TripDetailTabSwitcher
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === "Work" ? (
        <FlatList
          data={works}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <WorkSessionCard work={item} index={index} />
          )}
          contentContainerStyle={{ gap: 10 }}
          ListEmptyComponent={
            !isLoadingWork ? (
              <View className="items-center justify-center py-10 gap-2">
                <Ionicons
                  name="briefcase-outline"
                  size={40}
                  color={APP_COLORS.textMuted}
                />
                <Text className="font-poppins text-textSecondary text-sm">
                  No work sessions found
                </Text>
              </View>
            ) : null
          }
          onEndReached={() => {
            if (hasNextWork && !isFetchingWork) fetchNextWork();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingWork ? (
              <ActivityIndicator style={{ padding: 16 }} />
            ) : null
          }
          refreshing={isLoadingWork}
          onRefresh={refetchWork}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={receipts}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ReceiptCard receipt={item} index={index} />
          )}
          contentContainerStyle={{ gap: 10 }}
          ListEmptyComponent={
            <View className="items-center justify-center py-10 gap-2">
              <Ionicons
                name="receipt-outline"
                size={40}
                color={APP_COLORS.textMuted}
              />
              <Text className="font-poppins text-textSecondary text-sm">
                No receipts found
              </Text>
            </View>
          }
          onEndReached={() => {
            if (hasNextReceipt && !isFetchingReceipt) fetchNextReceipt();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingReceipt ? (
              <ActivityIndicator style={{ padding: 16 }} />
            ) : null
          }
          refreshing={isLoadingReceipt}
          onRefresh={refetchReceipt}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default TripDetailScreen;
