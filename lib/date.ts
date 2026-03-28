// lib/date.ts

export const getLocalDate = (): string => {
  // Uses Intl to get the actual local date string — no offset math needed
  return new Intl.DateTimeFormat("en-CA").format(new Date()); // "2026-03-26"
};

export const getLocalDateTime = (): string => {
  // Just store UTC — let calculateDuration normalize both sides the same way
  return new Date().toISOString(); // "2026-03-26T19:30:00.000Z"
};

export const getLocalTime = (): string => {
  const now = new Date();
  return [
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0"),
  ].join(":"); // "01:00:00" actual local time
};

export const getLocalMidnight = (date: string): Date => {
  // Midnight in local time for the given date
  const [year, month, day] = date.split("-").map(Number);
  const midnight = new Date(year, month - 1, day + 1, 0, 0, 0, 0);
  return midnight;
};
