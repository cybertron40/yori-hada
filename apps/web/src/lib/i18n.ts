import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      app: {
        name: "Recipe Atlas",
        tagline: "Local-first recipe intelligence"
      },
      actions: {
        launchApp: "Launch App",
        getStarted: "Get Started",
        notifyMe: "Notify me"
      },
      features: {
        offline: "Offline-first syncing across devices",
        recommendations: "Ingredient-aware recommendations",
        grocery: "Smart grocery planning",
        privacy: "Privacy-first discovery from the web"
      }
    }
  },
  es: {
    translation: {
      app: {
        name: "Atlas de Recetas",
        tagline: "Inteligencia de recetas local"
      },
      actions: {
        launchApp: "Abrir aplicación",
        getStarted: "Comenzar",
        notifyMe: "Avísame"
      },
      features: {
        offline: "Sincronización sin conexión en todos los dispositivos",
        recommendations: "Recomendaciones basadas en ingredientes",
        grocery: "Listas de compras inteligentes",
        privacy: "Descubrimiento web con privacidad"
      }
    }
  }
} as const;

let initialized = false;

export function initI18n() {
  if (initialized || typeof window === "undefined") return i18next;

  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      interpolation: {
        escapeValue: false
      },
      detection: {
        order: ["querystring", "cookie", "localStorage", "navigator"],
        caches: ["localStorage", "cookie"]
      }
    })
    .catch((error) => {
      console.error("Failed to initialize i18next", error);
    });

  initialized = true;
  return i18next;
}
