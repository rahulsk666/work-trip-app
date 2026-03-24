import { APP_COLORS } from "@/lib/consts";
import { useLatestTripQuery } from "@/module/trip/hooks";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const DashboardActions = () => {
  const { data: trip } = useLatestTripQuery();

  return (
    <View className="flex-row gap-3" style={{ marginVertical: 20 }}>
      {trip ? (
        <View className="flex-1 flex-row gap-3">
          <TouchableOpacity
            className="bg-primary flex-1 p-5 m-1 items-center justify-center rounded-2xl"
            onPress={() => router.navigate("/(track)/track")}
          >
            <Ionicons
              className="p-2"
              name="paper-plane"
              size={24}
              color={APP_COLORS.textPrimary}
            />
            <Text className="text-white font-semibold mt-2">Trip Details</Text>
          </TouchableOpacity>
          {!trip?.end_time && (
            <TouchableOpacity
              className="flex-1 p-5 m-1 items-center justify-center rounded-2xl border border-borderSubtle bg-cardElevated"
              onPress={() => router.navigate("/(trip)/stop")}
              disabled={!!trip.end_time}
            >
              <Ionicons
                className="p-2"
                name="stop-circle"
                size={28}
                color={APP_COLORS.danger}
              />
              <Text className="text-white font-semibold mt-2">Stop Work</Text>
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
              name="send"
              size={24}
              color={APP_COLORS.textPrimary}
            />
            <Text className="text-white font-semibold mt-2">Start Trip</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default DashboardActions;
