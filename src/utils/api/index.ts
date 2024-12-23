import axios, { AxiosError } from 'axios';
import { ApiError } from '../errors';
import { authService } from '../../services/auth.service';

const api = axios.create({
  baseURL: 'http://localhost:50001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: Error | null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    // Ensure credentials are sent with every request
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(new ApiError('Request configuration failed', error))
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(
        new ApiError('Unable to connect to the server. Please check your internet connection.')
      );
    }

    // Handle 401 errors
    if (error.response.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await authService.refresh();
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error);
        // If refresh fails, redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other errors
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