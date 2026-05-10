import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import translationEN from "./translations/en.json"
import translationAR from "./translations/ar.json"
import translationFR from "./translations/fr.json"
import translationIT from "./translations/it.json"

const resources = {
  en: {
    translation: translationEN,
    privacy: translationEN.privacy || {}
  },
  fr: {
    translation: translationFR,
    privacy: translationFR.privacy || {}
  },
  ar: {
    translation: translationAR,
    privacy: translationAR.privacy || {}
  },
  lb: {
    translation: translationAR,
    privacy: translationAR.privacy || {}
  },
  it: {
    translation: translationIT,
    privacy: translationIT.privacy || {}
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,

    fallbackLng: "en",

    detection: {
      order: ["path", "localStorage", "navigator"],
      lookupFromPathIndex: 0
    },

    interpolation: {
      escapeValue: false
    },

    react: {
      useSuspense: false
    }
  })

export default i18n
