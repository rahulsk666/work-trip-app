import StatusDot from "@/components/StatusDot";
import { APP_COLORS } from "@/lib/consts";
import { Duration } from "@/lib/duration";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import CountdownBox from "./CountdownBox";

interface TripCountDownProps {
  showStatusBadge?: boolean;
  duration?: Duration | null;
}

const TripCountDown = ({
  showStatusBadge = false,
  duration,
}: TripCountDownProps) => {
  const [hours, setHours] = useState<string | null>(null);
  const [mins, setMins] = useState<string | null>();
  const [seconds, setSeconds] = useState<string | null>(null);

  useEffect(() => {
    if (duration && duration.h && duration.m && duration.s) {
      setHours(duration.h);
      setMins(duration.m);
      setSeconds(duration.s);
    }
  }, [duration]);

  return (
    <View className="flex-col justify-center items-center p-2 m-2 mt-3">
      {showStatusBadge && (
        <View
          className="flex-row gap-2 rounded-xl justify-center items-center px-4 py-2"
          style={{
            borderWidth: 1,
            borderColor: APP_COLORS.yellow,
            backgroundColor: APP_COLORS.background,

            // Glow / shadow effect
            shadowColor: APP_COLORS.yellow,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 6,
            elevation: 6,
          }}
        >
          <StatusDot active color={APP_COLORS.yellow} />
          <Text className="font-semibold" style={{ color: APP_COLORS.yellow }}>
            Ready to Start
          </Text>
        </View>
      )}
      <View className="flex-row gap-3" style={{ marginTop: 20 }}>
        <CountdownBox label="HOURS" value={hours ?? "00"} />
        <CountdownBox label="MINUTES" value={mins ?? "00"} />
        <CountdownBox label="SECONDS" value={seconds ?? "00"} />
      </View>
    </View>
  );
};

export default TripCountDown;
