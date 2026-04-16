import StatusBadge from "@/components/StatusBadge";
import { APP_COLORS } from "@/lib/consts";
import { Duration } from "@/lib/duration";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import CountdownBox from "./CountdownBox";

interface TripCountDownProps {
  showStatusBadge?: boolean;
  duration?: Duration | null;
}

const TripCountDown = ({
  showStatusBadge = false,
  duration,
}: TripCountDownProps) => {
  const { t } = useTranslation();
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
    <View className="flex-col justify-center items-center p-2 m-2 mt-1">
      {showStatusBadge && (
        <StatusBadge
          color={APP_COLORS.yellow}
          textColor={APP_COLORS.yellow}
          borderColor={APP_COLORS.yellow}
          shadowColor={APP_COLORS.yellow}
          label={t("common.ready_to_start")}
        />
      )}
      <View className="flex-row gap-3" style={{ marginTop: 20 }}>
        <CountdownBox label={t("common.hours")} value={hours ?? "00"} />
        <CountdownBox label={t("common.minutes")} value={mins ?? "00"} />
        <CountdownBox label={t("common.seconds")} value={seconds ?? "00"} />
      </View>
    </View>
  );
};

export default TripCountDown;
