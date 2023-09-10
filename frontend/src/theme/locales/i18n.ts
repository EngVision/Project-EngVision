import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import EN from './EN/en.json'
import VN from './VN/vn.json'

const resources = {
  en: {
    translation: {
        Home: EN.Home.doclist, 
    },
  },
  vi: {
    translation: {
        Home: VN.Home.doclist,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;