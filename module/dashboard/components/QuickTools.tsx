import TitleLabel from "@/components/title-label";
import { APP_COLORS } from "@/lib/consts";
import QuickToolCard from "@/module/dashboard/components/QuickToolCard";
import React from "react";
import { View } from "react-native";

interface QuickToolsProps {
  disabled?: boolean;
}

const QuickTools = ({ disabled }: QuickToolsProps) => {
  return (
    <View className="mt-3">
      <TitleLabel title="Quick Tools" />
      <View className="flex-row items-center justify-between mt-3">
        <QuickToolCard
          icon="receipt-text"
          label="Receipts"
          color={disabled ? APP_COLORS.textMuted : APP_COLORS.warning}
          disabled={disabled}
        />
        <QuickToolCard
          icon="note-edit"
          label="Vehicle Log"
          color={disabled ? APP_COLORS.textMuted : APP_COLORS.success}
          disabled={disabled}
        />
        <QuickToolCard
          icon="shield-alert"
          label="Accident"
          color={disabled ? APP_COLORS.textMuted : APP_COLORS.danger}
          disabled={disabled}
        />
      </View>
    </View>
  );
};

export default QuickTools;
