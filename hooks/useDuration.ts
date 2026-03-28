import { getLocalMidnight } from "@/lib/date";
import { calculateDuration, Duration } from "@/lib/duration";
import { useEffect, useMemo, useState } from "react";

export function useDuration(
  startTime: string,
  endTime?: string | null,
  date?: string | null, // kept for midnight cap logic only
): Duration | null {
  const effectiveEndTime = useMemo(() => {
    if (endTime) return endTime;

    if (date) {
      const midnight = getLocalMidnight(date);
      if (new Date() > midnight) {
        return midnight.toISOString();
      }
    }

    return null;
  }, [endTime, date]);

  const [duration, setDuration] = useState<Duration | null>(
    startTime ? calculateDuration(startTime, effectiveEndTime) : null,
  );

  useEffect(() => {
    if (!startTime) {
      setDuration(null);
      return;
    }

    setDuration(calculateDuration(startTime, effectiveEndTime));

    if (effectiveEndTime) return; // ✅ no interval if trip ended

    const interval = setInterval(() => {
      setDuration(calculateDuration(startTime)); // ✅ no date param needed
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, effectiveEndTime]);

  return duration;
}
