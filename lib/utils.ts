import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const withOpacity = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
