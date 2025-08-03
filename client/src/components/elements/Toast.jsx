import React, { createContext, useContext, useState, useCallback } from 'react';
import { FiX, FiAlertCircle, FiCheckCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';
import { createPortal } from 'react-dom';

// Create context for toast management
const ToastContext = createContext(null);

// Toast types with their corresponding icons and colors
const TOAST_TYPES = {
  success: {
    icon: FiCheckCircle,
    bgColor: 'bg-success',
    textColor: 'text-white',
    borderColor: 'border-success',
  },
  error: {
    icon: FiAlertCircle,
    bgColor: 'bg-danger',
    textColor: 'text-white',
    borderColor: 'border-danger',
  },
  warning: {
    icon: FiAlertTriangle,
    bgColor: 'bg-amber-500',
    textColor: 'text-white',
    borderColor: 'border-amber-500',
  },
  info: {
    icon: FiInfo,
    bgColor: 'bg-primary',
    textColor: 'text-white',
    borderColor: 'border-primary',
  },
};

// Individual Toast component
const Toast = ({ id, type, message, onClose, autoClose = true }) => {
  const { icon: Icon, bgColor, textColor, borderColor } = TOAST_TYPES[type] || TOAST_TYPES.info;

  // Auto-close toast after 5 seconds
  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose(id);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [id, onClose, autoClose]);

  return (
    <div 
      className={`flex items-center justify-between p-4 mb-3 rounded-md shadow-md border-l-4 ${borderColor} bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out transform hover:translate-x-1`}
      role="alert"
    >
      <div className="flex items-center">
        <div className={`p-2 rounded-full ${bgColor} ${textColor} mr-3`}>
          <Icon className="w-5 h-5" />
        </div>
        <p className="text-sm font-medium dark:text-white">{message}</p>
      </div>
      <button 
        onClick={() => onClose(id)} 
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
        aria-label="Close"
      >
        <FiX className="w-5 h-5" />
      </button>
    </div>
  );
};

// Toast container component
const ToastContainer = ({ toasts, removeToast }) => {
  return createPortal(
    <div className="fixed top-4 right-4 z-50 w-80 max-w-md">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={removeToast}
          autoClose={toast.autoClose}
        />
      ))}
    </div>,
    document.body
  );
};

// Toast provider component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Add a new toast
  const addToast = useCallback((type, message, options = {}) => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, type, message, autoClose: options.autoClose !== false },
    ]);
    return id;
  }, []);

  // Remove a toast by ID
  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  // Convenience methods for different toast types
  const toast = {
    success: (message, options) => addToast('success', message, options),
    error: (message, options) => addToast('error', message, options),
    warning: (message, options) => addToast('warning', message, options),
    info: (message, options) => addToast('info', message, options),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {toasts.length > 0 && <ToastContainer toasts={toasts} removeToast={removeToast} />}
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};