export const receiptKeys = {
  all: ["receipts"] as const,
  getByPagination: (tripId?: string) =>
    [...receiptKeys.all, "pagination", tripId] as const,
  getById: (id: string) => [...receiptKeys.all, "id", id] as const,
  latest: (tripId?: string) => [...receiptKeys.all, "latest", tripId] as const,
  today: () => [...receiptKeys.all, "today"] as const,
};
