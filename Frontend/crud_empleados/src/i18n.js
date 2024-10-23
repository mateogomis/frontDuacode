import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importamos las traducciones
import translationES from './locales/es/translation.json';
import translationEN from './locales/en/translation.json';

// Configuramos i18next
i18n
  .use(initReactI18next) // Conectar i18next con React
  .init({
    resources: {
      es: { translation: translationES }, // Traducción en español
      en: { translation: translationEN },  // Traducción en inglés
    },
    lng: 'es', // Idioma predeterminado (Español)
    fallbackLng: 'es', // Idioma por defecto si la traducción no está disponible
    interpolation: {
      escapeValue: false // React ya se encarga de proteger contra XSS
    }
  });

export default i18n;
