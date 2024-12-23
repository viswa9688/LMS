import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { authService } from '../services/auth.service';
import { ApiError } from '../utils/errors';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  validationErrors: Record<string, string> | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: User['role']) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      error: null,
      validationErrors: null,
      loading: false,

      login: async (email: string, password: string) => {
        try {
          set({ loading: true, error: null, validationErrors: null });
          const user = await authService.login({ email, password });
          set({ user, isAuthenticated: true, loading: false });
        } catch (error) {
          if (error instanceof ApiError) {
            set({
              error: error.message,
              validationErrors: error.validationErrors || null,
              loading: false,
            });
          } else {
            set({
              error: 'An unexpected error occurred',
              loading: false,
            });
          }
          throw error;
        }
      },

      register: async (email: string, password: string, name: string, role: User['role']) => {
        try {
          set({ loading: true, error: null, validationErrors: null });
          const user = await authService.register({ email, password, name, role });
          set({ user, isAuthenticated: true, loading: false });
        } catch (error) {
          if (error instanceof ApiError) {
            set({
              error: error.message,
              validationErrors: error.validationErrors || null,
              loading: false,
            });
          } else {
            set({
              error: 'An unexpected error occurred',
              loading: false,
            });
          }
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ loading: true, error: null });
          await authService.logout();
          set({ 
            user: null, 
            isAuthenticated: false, 
            error: null, 
            validationErrors: null,
            loading: false 
          });
        } catch (error) {
          // Even if logout fails, we want to clear the state
          set({ 
            user: null,
            isAuthenticated: false,
            error: null,
            validationErrors: null,
            loading: false
          });
        }
      },

      clearError: () => set({ error: null, validationErrors: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);