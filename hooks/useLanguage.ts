// module/profile/hooks/useLanguage.ts
import { LANGUAGES, LanguageCode } from "@/constants/languages";
import i18n from "@/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const LANGUAGE_STORAGE_KEY = "language";

const getActiveLabel = (code: string) =>
  LANGUAGES.find((l) => l.code === code)?.label ?? "English";

export const useLanguage = () => {
  const [activeLabel, setActiveLabel] = useState(() =>
    getActiveLabel(i18n.language),
  );

  const changeLanguage = async (label: string) => {
    const match = LANGUAGES.find((l) => l.label === label);
    if (!match || match.label === activeLabel) return;

    setActiveLabel(match.label);
    await i18n.changeLanguage(match.code as LanguageCode);
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, match.code);
  };

  return { activeLabel, changeLanguage };
};
