import TitleLabel from "@/components/title-label";
import { APP_COLORS } from "@/lib/consts";
import React from "react";
import { View } from "react-native";
import StatCard from "../../../components/dashboard/StatCard";

const TodaysActivity = () => {
  return (
    <View>
      <TitleLabel title="Today's Activity" />
      <View className="flex-row items-center justify-between mt-3">
        <StatCard icon="time" label="Hours" value="6h 12m" />
        <StatCard
          icon="speedometer-sharp"
          label="Miles"
          value="45.2 mi"
          color={APP_COLORS.purple}
        />
      </View>
    </View>
  );
};

export default TodaysActivity;
