import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TriangleAlert } from "lucide-react";
import Button from "../ui/Button";

const ConfirmContext = createContext(null);

const DEFAULTS = {
  title: "Are you sure?",
  message: "",
  confirmLabel: "Confirm",
  cancelLabel: "Cancel",
  tone: "danger",
};

export const ConfirmProvider = ({ children }) => {
  const [request, setRequest] = useState(null);
  const pending = useRef(null);

  const settle = useCallback((result) => {
    const current = pending.current;
    pending.current = null;
    setRequest(null);
    current?.resolve(result);
  }, []);

  // Resolves to true when the user confirms, false otherwise.
  const confirm = useCallback(
    (options = {}) =>
      new Promise((resolve) => {
        // Only one dialog at a time: a newer request cancels the older one.
        pending.current?.resolve(false);

        const next = { ...DEFAULTS, ...options, resolve };
        pending.current = next;
        setRequest(next);
      }),
    []
  );

  useEffect(() => {
    if (!request) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") settle(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [request, settle]);

  const api = useMemo(() => ({ confirm }), [confirm]);

  return (
    <ConfirmContext.Provider value={api}>
      {children}

      {request && (
        <div
          className="ui-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) settle(false);
          }}
        >
          <div
            className="ui-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="ui-confirm-title"
            aria-describedby="ui-confirm-message"
          >
            <div
              className={`ui-modal__icon ui-modal__icon--${
                request.tone === "danger" ? "danger" : "primary"
              }`}
            >
              <TriangleAlert size={22} aria-hidden="true" />
            </div>
            <h2 id="ui-confirm-title" className="ui-modal__title">
              {request.title}
            </h2>
            {request.message && (
              <p id="ui-confirm-message" className="ui-modal__message">
                {request.message}
              </p>
            )}
            <div className="ui-modal__actions">
              <Button
                variant="secondary"
                onClick={() => settle(false)}
                autoFocus
              >
                {request.cancelLabel}
              </Button>
              <Button
                variant={request.tone === "danger" ? "danger" : "primary"}
                onClick={() => settle(true)}
              >
                {request.confirmLabel}
              </Button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmContext);

  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }

  // Returns a function: await confirmAction({ title, message }) -> boolean
  return context.confirm;
};
