export const formatDate = (
  date: string | Date,
  monthType: "short" | "long" = "short",
  dayType: "2-digit" | "numeric" = "2-digit",
  weekdayType: "short" | "long" = "long",
) =>
  new Date(date).toLocaleDateString(undefined, {
    month: monthType,
    day: dayType,
    weekday: weekdayType,
  });
