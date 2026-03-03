export const userKeys = {
  all: ["user", "profile"] as const,
  get: () => [...userKeys.all, "list"] as const,
};
