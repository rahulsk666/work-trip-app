export const formatDate = (
  date: string | Date,
  options?: {
    monthType?: "short" | "long";
    dayType?: "2-digit" | "numeric";
    weekdayType?: "short" | "long";
    yearType?: "2-digit" | "numeric";
    showTime?: boolean;
    showYear?: boolean;
  },
) => {
  const {
    monthType = "short",
    dayType = "2-digit",
    weekdayType = "long",
    yearType = "numeric",
    showTime = false,
    showYear = false,
  } = options || {};

  const dateObj = new Date(date);

  return dateObj.toLocaleString(undefined, {
    month: monthType,
    day: dayType,
    weekday: weekdayType,
    ...(showYear && { year: yearType }),
    ...(showTime && {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  });
};
