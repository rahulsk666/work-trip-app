// lib/duration.ts
export type Duration = {
  h: string;
  m: string;
  s: string;
  formatted: string;
  short: string;
};

const toLocalMs = (dateStr: string): number => {
  return new Date(dateStr).getTime(); // ✅ just parse as-is, both sides are UTC
};

const getNowLocalMs = (): number => {
  return Date.now(); // ✅ consistent with above
};

export const calculateDuration = (
  startTime: string,
  endTime?: string | null,
): Duration => {
  const start = toLocalMs(startTime);
  const end = endTime ? toLocalMs(endTime) : getNowLocalMs();

  const diffMs = Math.max(0, end - start);

  const totalSeconds = Math.floor(diffMs / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  const pad = (n: number) => String(n).padStart(2, "0");

  return {
    h: pad(h),
    m: pad(m),
    s: pad(s),
    formatted: `${pad(h)}:${pad(m)}:${pad(s)}`,
    short: h === 0 && m === 0 ? "0m" : h > 0 ? `${h}h ${pad(m)}m` : `${m}m`,
  };
};
