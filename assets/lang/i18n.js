import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fi from './fi.json';
import en from './en.json';


i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'fi',
    preload: ['fi'],
    fallbackLng: 'fi',
    resources: {
        fi: fi,
        en: en,
    },
    interpolation: {
        escapeValue: false 
    }
});

export default i18n;