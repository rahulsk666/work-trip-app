import { calculateDuration, Duration } from "@/lib/duration";
import { useEffect, useMemo, useState } from "react";

export function useDuration(
  startTime: string,
  endTime?: string | null,
  date?: string | null,
): Duration | null {
  // If trip date is in the past and no end time, cap at midnight
  const effectiveEndTime = useMemo(() => {
    if (endTime) return endTime;

    if (date) {
      const midnight = new Date(date);
      midnight.setDate(midnight.getDate() + 1);
      midnight.setHours(0, 0, 0, 0);

      if (new Date() > midnight) {
        return midnight.toISOString(); // treat as ended at midnight
      }
    }

    return null;
  }, [endTime, date]);

  const [duration, setDuration] = useState<Duration | null>(
    startTime ? calculateDuration(startTime, effectiveEndTime, date) : null,
  );

  useEffect(() => {
    if (!startTime) {
      setDuration(null);
      return;
    }

    setDuration(calculateDuration(startTime, effectiveEndTime, date));

    if (effectiveEndTime) return;

    const interval = setInterval(() => {
      setDuration(calculateDuration(startTime, undefined, date));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, effectiveEndTime, date]);

  return duration;
}
