export const workKeys = {
  all: ["works"] as const,
  getByAll: (tripId?: string) => [...workKeys.all, "list", tripId] as const,
  getByPagination: (tripId?: string) =>
    [...workKeys.all, "pagination", tripId] as const, // ✅ include tripId
  getByLimit: (tripId?: string) => [...workKeys.all, "limit", tripId] as const,
  getById: (id: string) => [...workKeys.all, "id", id] as const,
  latest: (tripId?: string) => [...workKeys.all, "latest", tripId] as const,
  today: () => [...workKeys.all, "today"] as const,
};
