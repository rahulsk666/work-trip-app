import TitleLabel from "@/components/title-label";
import { APP_COLORS } from "@/lib/consts";
import QuickToolCard from "@/module/dashboard/components/QuickToolCard";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

interface QuickToolsProps {
  disabled?: boolean;
}

const QuickTools = ({ disabled }: QuickToolsProps) => {
  const { t } = useTranslation();
  return (
    <View className="">
      <TitleLabel title={t("dashboard.quick_tools.title")} />
      <View className="flex-row items-center justify-center mt-3 gap-3">
        <QuickToolCard
          icon="receipt-text"
          label={t("dashboard.quick_tools.receipts")}
          onPress={() => router.navigate("/(receipt)/receipt")}
          color={disabled ? APP_COLORS.textMuted : APP_COLORS.warning}
          disabled={disabled}
        />
        <QuickToolCard
          icon="shield-alert"
          label={t("dashboard.quick_tools.accident")}
          onPress={() => router.navigate("/(accident)/accident")}
          color={disabled ? APP_COLORS.textMuted : APP_COLORS.danger}
          disabled={disabled}
        />
      </View>
    </View>
  );
};

export default QuickTools;
