import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslation from './locales/en/translation.json';
import nlTranslation from './locales/nl/translation.json';
import ptTranslation from './locales/pt/translation.json';
import deTranslation from './locales/de/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      nl: { translation: nlTranslation },
      pt: { translation: ptTranslation },
      de: { translation: deTranslation }
    },
    lng: 'nl', // Default language
    fallbackLng: 'nl',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
