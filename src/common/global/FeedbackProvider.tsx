import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import GlobalPopup, { Notice, NoticeInput } from "./GlobalPopup";

type FeedbackContextValue = {
  showNotice: (notice: NoticeInput) => void;
  dismissNotice: () => void;
};

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

export function FeedbackProvider({ children }: PropsWithChildren) {
  const [notice, setNotice] = useState<Notice | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismissNotice = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setNotice(null);
  }, []);

  const showNotice = useCallback((nextNotice: NoticeInput) => {
    if (timer.current) clearTimeout(timer.current);
    setNotice({ ...nextNotice, position: nextNotice.position ?? "center-top", mode: nextNotice.mode ?? "toast" });
    if ((nextNotice.mode ?? "toast") === "toast") {
      timer.current = setTimeout(() => setNotice(null), nextNotice.duration ?? 3200);
    }
  }, []);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return (
    <FeedbackContext.Provider value={{ showNotice, dismissNotice }}>
      {children}
      <GlobalPopup notice={notice} onDismiss={dismissNotice} />
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) throw new Error("useFeedback must be used within FeedbackProvider");
  return context;
}