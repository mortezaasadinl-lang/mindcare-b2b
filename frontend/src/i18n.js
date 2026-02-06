import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import nl from './locales/nl.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import fa from './locales/fa.json';
import ar from './locales/ar.json';
import tr from './locales/tr.json';

const resources = {
  en: { translation: en },
  nl: { translation: nl },
  de: { translation: de },
  fr: { translation: fr },
  fa: { translation: fa },
  ar: { translation: ar },
  tr: { translation: tr }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'nl', 'de', 'fr', 'fa', 'ar', 'tr'],
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false
    }
  });

export const languages = [
  { code: 'en', name: 'EN', flag: '🇬🇧', dir: 'ltr' },
  { code: 'nl', name: 'NL', flag: '🇳🇱', dir: 'ltr' },
  { code: 'de', name: 'DE', flag: '🇩🇪', dir: 'ltr' },
  { code: 'fr', name: 'FR', flag: '🇫🇷', dir: 'ltr' },
  { code: 'fa', name: 'FA', flag: '🇮🇷', dir: 'rtl' },
  { code: 'ar', name: 'AR', flag: '🇸🇦', dir: 'rtl' },
  { code: 'tr', name: 'TR', flag: '🇹🇷', dir: 'ltr' }
];

export const isRTL = (lang) => ['fa', 'ar'].includes(lang);

export default i18n;
