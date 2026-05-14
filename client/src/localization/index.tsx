import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en/common.json";
import tr from "./tr/common.json";

const deviceLanguage = getLocales()[0]?.languageCode || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    tr: { translation: tr },
  },
  lng: deviceLanguage,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

const loadStoredLanguage = async () => {
  try {
    const stored = await AsyncStorage.getItem("@language");
    if (stored) i18n.changeLanguage(stored);
    else await AsyncStorage.setItem("@language", deviceLanguage);
  } catch (error) {
    console.error("Error loading language from storage", error);
  }
};

loadStoredLanguage();

export default i18n;
