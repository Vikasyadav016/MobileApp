import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

const USER_STORAGE_KEY = "nova.user";

export type AppUser = {
  email: string;
  name: string;
};

export type AppPresentation = "app" | "web";

type AppContextValue = {
  user: AppUser | null;
  isReady: boolean;
  presentation: AppPresentation;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  setPresentation: (presentation: AppPresentation) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

function nameFromEmail(email: string) {
  const firstName = email.split("@")[0]?.split(/[._-]/)[0] ?? "there";
  return firstName.charAt(0).toUpperCase() + firstName.slice(1);
}

export function AppProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [presentation, setPresentation] = useState<AppPresentation>("app");

  useEffect(() => {
    AsyncStorage.getItem(USER_STORAGE_KEY)
      .then((storedUser) => {
        if (storedUser) setUser(JSON.parse(storedUser) as AppUser);
      })
      .finally(() => setIsReady(true));
  }, []);

  async function signIn(email: string) {
    const nextUser = { email, name: nameFromEmail(email) };
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }

  async function signOut() {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  }

  return (
    <AppContext.Provider
      value={{ user, isReady, presentation, signIn, signOut, setPresentation }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
}