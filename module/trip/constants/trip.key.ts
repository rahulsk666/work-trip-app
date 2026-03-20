export const tripKeys = {
  all: ["trip"] as const,
  getAll: () => [...tripKeys.all, "list"] as const,
  getById: (id: string) => [[...tripKeys.all, "id"] as const],
};
