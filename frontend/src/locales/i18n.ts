import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import EN from './EN/en.json'
import VN from './VN/vn.json'
import { useAppSelector } from '../hooks/redux'

//const languages = useAppSelector((state) => state.app.locales)

const resources = {
  en: {
    translation: EN,
  },
  vi: {
    translation: VN,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
