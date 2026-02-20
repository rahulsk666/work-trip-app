import { APP_COLORS } from "@/lib/consts";
import DutyInfo from "@/module/dashboard/components/DutyInfo";
import QuickTools from "@/module/dashboard/components/QuickTools";
import TodaysActivity from "@/module/dashboard/components/TodaysActivity";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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

      <DutyInfo />
      <TodaysActivity />
      <QuickTools />

      <View className="flex-row gap-3 mt-5">
        <TouchableOpacity className="bg-primary flex-1 p-5 items-center justify-center rounded-2xl">
          <Ionicons name="send" size={24} color={APP_COLORS.textPrimary} />
          <Text className="text-white font-semibold mt-2">Start Trip</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 p-5 items-center justify-center rounded-2xl border border-borderSubtle bg-cardElevated">
          <Ionicons name="stop-circle" size={28} color={APP_COLORS.danger} />
          <Text className="text-white font-semibold mt-2">Stop Work</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
