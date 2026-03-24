export const workKeys = {
  all: ["work"],
  getAll: () => [...workKeys.all, "list"],
  getById: (id: string) => [...workKeys.all, id],
  today: () => [...workKeys.all, "today"],
  latest: () => [...workKeys.all, "latest"],
};
