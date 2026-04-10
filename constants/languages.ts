export const LANGUAGES = [
  { label: "English", country: "us", code: "en" },
  { label: "Deutsch", country: "de", code: "de" },
  { label: "Türkçe", country: "tr", code: "tr" },
  { label: "العربية", country: "ae", code: "ar" },
  { label: "Русский", country: "ru", code: "ru" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];
export type LanguageLabel = (typeof LANGUAGES)[number]["label"];
