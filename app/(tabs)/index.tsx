import { APP_COLORS } from "@/lib/consts";
import { formatDate } from "@/lib/fomatDate";
import DashboardActions from "@/module/dashboard/components/DashboardActions";
import DutyInfo from "@/module/dashboard/components/DutyInfo";
import QuickTools from "@/module/dashboard/components/QuickTools";
import StartTripForm from "@/module/dashboard/components/StartTripForm";
import TodaysActivity from "@/module/dashboard/components/TodaysActivity";
import { useUserQuery } from "@/module/profile/hooks";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const [isOnDuty, setIsOnDuty] = useState(false);
  const [startTripOpen, setStartTripOpen] = useState(false);
  const { data: user } = useUserQuery();

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      {/* Header */}
      <View className="flex-row justify-between items-center my-2">
        {/* Profile */}
        <View className="flex-row items-center gap-3 flex-1">
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => router.navigate("/(tabs)/profile")}
            className="relative"
          >
            <Image
              source={{ uri: user?.avatar_url || "https://i.pravatar.cc/300" }}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
            <View className="w-[12px] h-[12px] bg-success rounded-full absolute bottom-[2px] right-[0px] border-2 border-background" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-textSecondary text-sm">
              {formatDate(new Date())}
            </Text>
            <Text className="text-textPrimary font-bold text-xl">
              Welcome back, {user?.name}
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

      <DashboardActions />
      {/* <StartTripForm
        openStartTrip={startTripOpen}
        onStartTripClose={() => setStartTripOpen(false)}
      /> */}
    </SafeAreaView>
  );
}
