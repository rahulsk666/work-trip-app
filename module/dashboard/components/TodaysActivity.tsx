import { IconSymbol } from "@/components/ui/icon-symbol";
import { calculateTotalWorkTime } from "@/lib/calculateWork";
import { APP_COLORS } from "@/lib/consts";
import { useLatestTripQuery } from "@/module/trip/hooks";
import { useWorkByTripQuery } from "@/module/work/hooks";
import React from "react";
import { Text, View } from "react-native";

const TodaysActivity = () => {
  const { data: trip } = useLatestTripQuery();
  const { data: works } = useWorkByTripQuery({ tripId: trip?.id });
  const totalWorks = calculateTotalWorkTime(works ?? []);
  return (
    <View
      className="flex-1 flex-col items-center justify-center border border-borderSubtle border-dashed gap-2 rounded-lg"
      style={{
        borderWidth: 1,
        borderColor: APP_COLORS.borderSubtle,
        minHeight: 150,
      }}
    >
      <View
        className="rounded-full p-1 items-center justify-center"
        style={{
          backgroundColor: trip
            ? APP_COLORS.primaryShadow
            : APP_COLORS.textMutedShadow,
          borderRadius: 100,
        }}
      >
        <IconSymbol
          size={28}
          name="clock.arrow.circlepath"
          color={trip ? APP_COLORS.primary : APP_COLORS.textMuted}
        />
      </View>
      <Text
        className="font-bold text-xl"
        style={{ color: trip ? APP_COLORS.textPrimary : APP_COLORS.textMuted }}
      >
        Hours Worked
      </Text>
      <Text
        className="text-2xl font-bold"
        style={{
          color: trip ? APP_COLORS.textPrimary : APP_COLORS.textMuted,
          fontSize: 28,
          lineHeight: 32,
        }}
      >
        {totalWorks.formatted ?? "00h 00m"}
      </Text>
    </View>
  );
};

export default TodaysActivity;
