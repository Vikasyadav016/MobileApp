import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import en from "./locales/en.json";
import hi from "./locales/hi.json";

export type Language = "en" | "hi";
export type TranslationKey = keyof typeof en;

const LANGUAGE_STORAGE_KEY = "nova.language";
const dictionaries: Record<Language, Record<TranslationKey, string>> = { en, hi };

type LocaleContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    AsyncStorage.getItem(LANGUAGE_STORAGE_KEY)
      .then((storedLanguage) => {
        if (storedLanguage === "en" || storedLanguage === "hi") {
          setLanguageState(storedLanguage);
        }
      })
      .catch(() => undefined);
  }, []);

  async function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage);
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {
      // Keep the selected language for the current session if persistence fails.
    }
  }

  function t(key: TranslationKey) {
    return dictionaries[language][key];
  }

  return (
    <LocaleContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useTranslation must be used within LocaleProvider");
  return context;
}