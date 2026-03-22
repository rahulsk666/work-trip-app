export const tripKeys = {
  all: ["trips"],
  getAll: () => [...tripKeys.all, "list"],
  getById: (id: string) => [...tripKeys.all, id],
  today: () => [...tripKeys.all, "today"],
  latest: () => [...tripKeys.all, "latest"],
};
