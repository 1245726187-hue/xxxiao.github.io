'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  showToast: (type: ToastType, message: string, duration?: number) => void;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

let toastIdCounter = 0;
function nextId(): string {
  toastIdCounter += 1;
  return `toast-${toastIdCounter}`;
}

const typeStyles: Record<ToastType, string> = {
  success: 'bg-accent-green text-ink-inverse',
  error: 'bg-accent-red text-ink-inverse',
  info: 'bg-surface text-ink shadow-card border border-surface-tertiary',
};

const typeIcons: Record<ToastType, ReactNode> = {
  success: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 7.5L5.5 10L11 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  error: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4L10 10M10 4L4 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  info: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 6V10M7 4.5V4.51"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const ToastContext = createContext<ToastContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string, duration = 3000) => {
      const id = nextId();
      setToasts((prev) => [...prev, { id, type, message }]);

      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container — centred on mobile, top-right on desktop */}
      <div
        className={cn(
          'fixed top-4 left-1/2 -translate-x-1/2 z-[100]',
          'sm:left-auto sm:right-4 sm:translate-x-0',
          'flex flex-col gap-2 pointer-events-none',
        )}
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: -16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'pointer-events-auto',
                'flex items-center gap-3 px-4 py-3 rounded-card-sm',
                'text-sm font-medium',
                'min-w-[280px] max-w-[360px]',
                'shadow-glass',
                typeStyles[toast.type],
              )}
            >
              {/* Icon */}
              <span
                className={cn(
                  'flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center',
                  toast.type === 'info'
                    ? 'bg-ink/10 text-ink'
                    : 'bg-ink-inverse/20 text-ink-inverse',
                )}
              >
                {typeIcons[toast.type]}
              </span>

              {/* Message */}
              <p className="flex-1">{toast.message}</p>

              {/* Dismiss */}
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className={cn(
                  'flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity',
                  'p-0.5',
                )}
                aria-label="Dismiss"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3L11 11M11 3L3 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a <ToastProvider>');
  }
  return ctx;
}
