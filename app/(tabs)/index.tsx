import { APP_COLORS } from "@/lib/consts";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const [isOnDuty, setIsOnDuty] = useState(false);

  const user = {
    image: "https://i.pravatar.cc/300",
    name: "Alex",
    date: "Oct 24, Tuesday",
    hours: "6h 12m",
    miles: "45.2 mi",
    duration: "03:15:20",
    location: "I-5 Southbound, Mile 42",
  };

  const today = new Date();

  const formattedDate = today.toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    weekday: "long",
  });

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        {/* Profile */}
        <View className="flex-row items-center gap-3 flex-1">
          <View className="relative">
            <Image
              source={{ uri: user.image }}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
            <View className="w-[12px] h-[12px] bg-success rounded-full absolute bottom-[2px] right-[0px] border-2 border-background" />
          </View>
          <View className="flex-1">
            <Text className="text-textSecondary text-sm">{formattedDate}</Text>
            <Text className="text-textPrimary font-bold text-xl">
              Welcome back, {user.name}
            </Text>
          </View>
        </View>

        {/* Status */}
        <View className="bg-success/10 border border-success/30 rounded-full px-3 py-1 flex-row gap-2 items-center w-fit">
          <Ionicons name="cloud-done" size={16} color={APP_COLORS.success} />
          <Text className="text-success uppercase font-bold text-sm">
            Synced
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
