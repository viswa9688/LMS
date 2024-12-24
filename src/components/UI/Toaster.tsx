import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { AlertError } from './AlertError';

export const Toaster = () => {
  const { error, clearError } = useAuthStore();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  if (!error) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AlertError message={error} onClose={clearError} />
    </div>
  );
};