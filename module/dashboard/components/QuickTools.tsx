import TitleLabel from "@/components/title-label";
import { APP_COLORS } from "@/lib/consts";
import QuickToolCard from "@/module/dashboard/components/QuickToolCard";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

interface QuickToolsProps {
  disabled?: boolean;
}

const QuickTools = ({ disabled }: QuickToolsProps) => {
  return (
    <View className="mt-3">
      <TitleLabel title="Quick Tools" />
      <View
        className="flex-row items-center justify-center mt-3 gap-6"
        style={{ width: "100%" }}
      >
        <QuickToolCard
          icon="receipt-text"
          label="Receipts"
          onPress={() => router.navigate("/(receipt)/receipt")}
          color={disabled ? APP_COLORS.textMuted : APP_COLORS.warning}
          disabled={disabled}
        />
        <QuickToolCard
          icon="shield-alert"
          label="Accident"
          onPress={() => router.navigate("/(accident)/accident")}
          color={disabled ? APP_COLORS.textMuted : APP_COLORS.danger}
          disabled={disabled}
        />
      </View>
    </View>
  );
};

export default QuickTools;
