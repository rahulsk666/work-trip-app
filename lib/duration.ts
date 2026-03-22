export type Duration = {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
  short: string;
};

export function calculateDuration(
  startTime: string,
  endTime?: string | null,
  tripDate?: string | null,
): Duration {
  const start = new Date(startTime);

  let end: Date;

  if (endTime) {
    // Trip ended — use end time
    end = new Date(endTime);
  } else if (tripDate) {
    // Cap at midnight of trip date
    const midnight = new Date(tripDate);
    midnight.setDate(midnight.getDate() + 1);
    midnight.setHours(0, 0, 0, 0);

    const now = new Date();

    // Use whichever is earlier — now or midnight
    end = now < midnight ? now : midnight;
  } else {
    end = new Date();
  }

  const diffMs = Math.max(0, end.getTime() - start.getTime());

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  let short = "";
  if (hours > 0) short += `${hours}h `;
  short += `${minutes}m`;

  return { hours, minutes, seconds, formatted: `${hh}:${mm}:${ss}`, short };
}
