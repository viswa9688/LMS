import axios, { AxiosError } from 'axios';
import { ApiError } from '../errors';

const api = axios.create({
  baseURL: 'http://localhost:50001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem('auth-storage');
    if (authData) {
      try {
        const { state } = JSON.parse(authData);
        if (state.user?.token) {
          config.headers.Authorization = `Bearer ${state.user.token}`;
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
      }
    }
    return config;
  },
  (error) => Promise.reject(new ApiError('Request configuration failed', error))
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      return Promise.reject(
        new ApiError('Unable to connect to the server. Please check your internet connection.')
      );
    }

    if (error.response.status === 401) {
      // Clear auth storage and redirect to login
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
      return Promise.reject(new ApiError('Session expired. Please login again.'));
    }

    if (error.response.data?.errors) {
      return Promise.reject(
        new ApiError('Validation failed', undefined, error.response.data.errors)
      );
    }

    if (error.response.data?.message) {
      return Promise.reject(new ApiError(error.response.data.message));
    }

    return Promise.reject(
      new ApiError('An unexpected error occurred. Please try again.')
    );
  }
);

export default api;