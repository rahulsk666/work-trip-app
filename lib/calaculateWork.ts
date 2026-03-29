import { Work } from "@/module/work/schemas/work.schema";

export const calculateTotalWorkTime = (works: Work[]) => {
  let totalMs = 0;

  works.forEach((work) => {
    if (!work.start_time) return;

    const start = new Date(work.start_time).getTime();

    const end = work.end_time ? new Date(work.end_time).getTime() : Date.now(); // ⭐ active session

    totalMs += end - start;
  });

  const hours = Math.floor(totalMs / (1000 * 60 * 60));

  const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));

  return {
    hours,
    minutes,
    formatted: `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(
      2,
      "0",
    )}m`,
  };
};
