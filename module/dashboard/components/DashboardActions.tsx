import { APP_COLORS } from "@/lib/consts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const DashboardActions = () => {
  return (
    <View className="flex-row gap-3 mt-5">
      <TouchableOpacity
        className="bg-primary flex-1 p-5 items-center justify-center rounded-2xl"
        onPress={() => router.navigate("/(trip)/trip")}
      >
        <Ionicons name="send" size={24} color={APP_COLORS.textPrimary} />
        <Text className="text-white font-semibold mt-2">Start Trip</Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-1 p-5 items-center justify-center rounded-2xl border border-borderSubtle bg-cardElevated">
        <Ionicons name="stop-circle" size={28} color={APP_COLORS.danger} />
        <Text className="text-white font-semibold mt-2">Stop Work</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardActions;
