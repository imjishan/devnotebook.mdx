import React, { useEffect } from 'react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 right-6 px-6 py-4 rounded-md shadow-xl text-white text-sm font-mono flex items-center gap-3 z-50 transform transition-all duration-300 ease-in-out translate-y-0 opacity-100 ${
        type === 'error' ? 'bg-red-600' : 'bg-gray-900'
      }`}
    >
      <span className="text-lg">{type === 'error' ? '⚠️' : '✓'}</span>
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 opacity-70 hover:opacity-100 focus:outline-none"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};
