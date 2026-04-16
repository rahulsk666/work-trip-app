// lib/version.ts
import * as Application from "expo-application";

export const getAppVersion = (): string => {
  return Application.nativeApplicationVersion ?? "0.0.0";
};

const parseVersion = (v: string) => v.split(".").map(Number);

export const isVersionBelow = (current: string, minimum: string): boolean => {
  const c = parseVersion(current);
  const m = parseVersion(minimum);
  for (let i = 0; i < 3; i++) {
    const diff = (c[i] ?? 0) - (m[i] ?? 0);
    if (diff < 0) return true;
    if (diff > 0) return false;
  }
  return false;
};
