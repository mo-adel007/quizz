import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en';
import es from './locales/es';
import fr from './locales/fr';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en,
      es,
      fr,
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;