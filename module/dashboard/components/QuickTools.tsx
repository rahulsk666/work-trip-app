import QuickToolCard from "@/components/dashboard/QuickToolCard";
import TitleLabel from "@/components/title-label";
import { APP_COLORS } from "@/lib/consts";
import React from "react";
import { View } from "react-native";

const QuickTools = () => {
  return (
    <View className="mt-3">
      <TitleLabel title="Quick Tools" />
      <View className="flex-row items-center justify-between mt-3">
        <QuickToolCard
          icon="receipt-text"
          label="Receipts"
          color={APP_COLORS.warning}
        />
        <QuickToolCard
          icon="note-edit"
          label="Vehicle Log"
          color={APP_COLORS.success}
        />
        <QuickToolCard
          icon="shield-alert"
          label="Accident"
          color={APP_COLORS.danger}
        />
      </View>
    </View>
  );
};

export default QuickTools;
