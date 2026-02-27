import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import translationDe from "./locales/de/translation.json";
import translationEn from "./locales/en/translation.json";

const resources = {
  en: { translation: translationEn },
  de: { translation: translationDe },
};

const i18n = createInstance();

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    savedLanguage = Localization.getLocales()[0]?.languageCode ?? "en";
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v4",
    resources,
    lng: savedLanguage,
    load: "languageOnly",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
