import { APP_COLORS } from "@/lib/consts";
import { useLatestTripQuery } from "@/module/trip/hooks";
import { useLatestWorkQuery } from "@/module/work/hooks";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const DashboardActions = () => {
  const { data: trip } = useLatestTripQuery();

  const { data: work } = useLatestWorkQuery(trip ? trip?.id : "");

  return (
    <View className="flex-row gap-3" style={{ marginVertical: 20 }}>
      {trip ? (
        <View className="flex-1 flex-row gap-3">
          {work ? (
            <TouchableOpacity
              className="flex-1 p-5 m-1 items-center justify-center rounded-2xl border border-borderSubtle bg-cardElevated"
              onPress={() => console.log("stop work")}
              disabled={!!work.end_time}
            >
              <Ionicons
                className="p-2"
                name="stop-circle"
                size={28}
                color={APP_COLORS.danger}
              />
              <Text className="text-textPrimary text-xl font-semibold mt-2">
                Stop Work
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="bg-primary flex-1 p-5 m-1 items-center justify-center rounded-2xl"
              onPress={() => console.log("start work")}
            >
              <Ionicons
                className="p-2"
                name="paper-plane"
                size={24}
                color={APP_COLORS.textPrimary}
              />
              <Text className="text-textPrimary text-xl font-semibold mt-2">
                Start Work
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <>
          <TouchableOpacity
            className="bg-primary flex-1 p-5 m-1 items-center justify-center rounded-2xl"
            onPress={() => router.navigate("/(trip)/start")}
          >
            <Ionicons
              className="p-2"
              name="play"
              size={24}
              color={APP_COLORS.textPrimary}
            />
            <Text className="text-textPrimary text-xl font-semibold mt-2">
              Start Trip
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default DashboardActions;
