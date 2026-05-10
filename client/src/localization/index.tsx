import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en/common.json";
import tr from "./tr/common.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    tr: { translation: tr },
  },
  saveMissing: true,
  lng: getLocales()[0].languageCode || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

AsyncStorage.getItem("@language").then((stored) => {
  const lang = stored || getLocales()[0].languageCode || "en";
  if (!stored) {
    AsyncStorage.setItem("@language", lang);
  }
  if (lang !== i18n.language) {
    i18n.changeLanguage(lang);
  }
});

export default i18n;
