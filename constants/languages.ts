export const LANGUAGES = [
  { label: "English", country: "us", code: "en" },
  { label: "Deutsch", country: "de", code: "de" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];
export type LanguageLabel = (typeof LANGUAGES)[number]["label"];
