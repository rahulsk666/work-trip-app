// i18n/index.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import translationAr from "./locales/ar/translation.json";
import translationDe from "./locales/de/translation.json";
import translationEn from "./locales/en/translation.json";
import translationRu from "./locales/ru/translation.json";
import translationTr from "./locales/tr/translation.json";

const resources = {
  en: { translation: translationEn },
  de: { translation: translationDe },
  tr: { translation: translationTr },
  ru: { translation: translationRu },
  ar: { translation: translationAr },
};

export const i18n = createInstance(); // named export for the provider

export const initI18n = async () => {
  const savedLanguage = await AsyncStorage.getItem("language");
  const deviceLanguage = Localization.getLocales()[0]?.languageCode ?? "en";

  if (!i18n.isInitialized) {
    await i18n.use(initReactI18next).init({
      resources,
      lng: savedLanguage ?? deviceLanguage,
      load: "languageOnly",
      fallbackLng: "en",
      interpolation: { escapeValue: false },
    });
  }

  return i18n;
};
