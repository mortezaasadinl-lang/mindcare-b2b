import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
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
  tr: { translation: tr },
};

// Get saved language from localStorage or detect
const getSavedLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('i18nextLng') || 'en';
  }
  return 'en';
};

// RTL languages
const RTL_LANGUAGES = ['fa', 'ar'];

// Function to update document direction
export const updateDocumentDirection = (lng) => {
  if (typeof document !== 'undefined') {
    const isRTL = RTL_LANGUAGES.includes(lng);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    
    // Add/remove RTL class for additional styling
    if (isRTL) {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: getSavedLanguage(),
    
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // React already safes from XSS
    },

    react: {
      useSuspense: false,
    },
  });

// Set initial direction
updateDocumentDirection(i18n.language);

// Listen for language changes and update direction
i18n.on('languageChanged', (lng) => {
  updateDocumentDirection(lng);
  // Persist to localStorage
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('i18nextLng', lng);
  }
});

// Helper to check if current language is RTL
export const isRTL = (lang) => RTL_LANGUAGES.includes(lang || i18n.language);

export default i18n;
