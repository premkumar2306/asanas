import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to Yogasara",
      instructorSignup: "Instructor Signup",
      studentDashboard: "Student Dashboard",
      flowBuilder: "Flow Builder",
      sessionSummary: "Session Summary",
      // add additional keys as needed
    },
  },
  es: {
    translation: {
      welcome: "Bienvenido a Yogasara",
      instructorSignup: "Registro de Instructor",
      studentDashboard: "Panel de Estudiantes",
      flowBuilder: "Constructor de Secuencias",
      sessionSummary: "Resumen de la Sesión",
      // add additional keys as needed
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
