import React, { createContext, useCallback, useContext, useState } from 'react';

export interface ToastOptions {
  duration?: number; // ms
}

interface ToastContextValue {
  showToast: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Array<{ id: number; message: string }>>([]);

  const showToast = useCallback((message: string, options?: ToastOptions) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message }]);
    const dur = options?.duration ?? 3000;
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, dur);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map((t) => (
          <div key={t.id} className="px-4 py-2 bg-blue-500 text-white rounded shadow">
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

export default ToastProvider;
