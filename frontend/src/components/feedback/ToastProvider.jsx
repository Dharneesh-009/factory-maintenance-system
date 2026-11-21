import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { CheckCircle, Info, X, XCircle } from "lucide-react";

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const DEFAULT_DURATION = {
  success: 4000,
  error: 6000,
  info: 4000,
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    (type, message, duration = DEFAULT_DURATION[type]) => {
      nextId.current += 1;
      const id = nextId.current;

      setToasts((current) => [...current, { id, type, message }]);

      if (duration) {
        window.setTimeout(() => dismiss(id), duration);
      }

      return id;
    },
    [dismiss]
  );

  const api = useMemo(
    () => ({
      success: (message, duration) => push("success", message, duration),
      error: (message, duration) => push("error", message, duration),
      info: (message, duration) => push("info", message, duration),
      dismiss,
    }),
    [push, dismiss]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}

      <div className="ui-toast-stack" aria-live="polite" aria-atomic="false">
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type] ?? Info;

          return (
            <div
              key={toast.id}
              role={toast.type === "error" ? "alert" : "status"}
              className={`ui-toast ui-toast--${toast.type}`}
            >
              <Icon size={20} className="ui-toast__icon" aria-hidden="true" />
              <div className="ui-toast__message">{toast.message}</div>
              <button
                type="button"
                className="ui-toast__close"
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss notification"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
