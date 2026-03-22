import { calculateDuration, Duration } from "@/lib/duration";
import { useEffect, useMemo, useState } from "react";

export function useDuration(
  startTime: string,
  endTime?: string | null,
  tripDate?: string | null,
): Duration {
  // If trip date is in the past and no end time, cap at midnight
  const effectiveEndTime = useMemo(() => {
    if (endTime) return endTime;

    if (tripDate) {
      const midnight = new Date(tripDate);
      midnight.setDate(midnight.getDate() + 1);
      midnight.setHours(0, 0, 0, 0);

      if (new Date() > midnight) {
        return midnight.toISOString(); // treat as ended at midnight
      }
    }

    return null;
  }, [endTime, tripDate]);

  const [duration, setDuration] = useState<Duration>(
    calculateDuration(startTime, effectiveEndTime, tripDate),
  );

  useEffect(() => {
    setDuration(calculateDuration(startTime, effectiveEndTime, tripDate));

    if (effectiveEndTime) {
      return;
    }

    const interval = setInterval(() => {
      setDuration(calculateDuration(startTime, undefined, tripDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, effectiveEndTime, tripDate]);

  return duration;
}
