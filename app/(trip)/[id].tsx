import Loading from "@/components/Loading";
import TripDetailHeaderCard from "@/module/trip/components/TripDetailHeaderCard";
import TripDetailTabSwitcher, {
  TripDetailTab,
} from "@/module/trip/components/TripDetailTabSwitcher";
import { useTripByIdQuery } from "@/module/trip/hooks";
import WorkSessionCard from "@/module/work/components/WorkSessionCard";
import { useWorkPaginatedQuery } from "@/module/work/hooks";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const TripDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [activeTab, setActiveTab] = useState<TripDetailTab>("work");

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

  const works = workData?.pages.flatMap((page) => page.data) ?? [];
  const receipts: any[] = [];

  const activeData = activeTab === "work" ? works : receipts;
  const isLoadingActive = activeTab === "work" ? isLoadingWork : false;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 p-4 gap-2 bg-background flex-col">
      <TripDetailHeaderCard trip={trip} />
      <TripDetailTabSwitcher
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <FlatList
        data={activeData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          activeTab === "work" ? (
            <WorkSessionCard work={item} />
          ) : (
            // 🔜 <ReceiptCard receipt={item} />
            <View />
          )
        }
        contentContainerStyle={{ gap: 10 }}
        onEndReached={() => {
          if (activeTab === "work" && hasNextWork && !isFetchingWork) {
            fetchNextWork();
          }
          // 🔜 add receipts pagination here
        }}
        onEndReachedThreshold={0.5}
        //   ListEmptyComponent={
        //   !isLoadingActive ? (
        //     <View className="items-center justify-center py-10 gap-2">
        //       <Ionicons
        //         name={activeTab === "work" ? "briefcase-outline" : "receipt-outline"}
        //         size={40}
        //         color={APP_COLORS.textMuted}
        //       />
        //       <Text className="font-poppins text-textSecondary text-sm">
        //         No {activeTab === "work" ? "work sessions" : "receipts"} found
        //       </Text>
        //     </View>
        //   ) : null
        // }
        // ListHeaderComponent={() => (
        //   <>
        //     <TripDetailHeaderCard trip={trip} />
        //     <TripDetailTabSwitcher
        //       activeTab={activeTab}
        //       setActiveTab={setActiveTab}
        //     />
        //   </>
        // )}
        ListFooterComponent={
          isFetchingWork && activeTab === "work" ? (
            <ActivityIndicator style={{ padding: 16 }} />
          ) : null
        }
        refreshing={isLoadingActive}
        onRefresh={activeTab === "work" ? refetchWork : undefined}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default TripDetailScreen;
