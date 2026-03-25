export const workKeys = {
  all: ["work"],
  getAll: () => [...workKeys.all, "list"],
  getByPagination: () => [...workKeys.all, "pagination"],
  getByLimit: () => [...workKeys.all, "limit"],
  getById: (id: string) => [...workKeys.all, id],
  today: () => [...workKeys.all, "today"],
  latest: () => [...workKeys.all, "latest"],
};
