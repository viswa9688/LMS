import axios, { AxiosError } from 'axios';
import { ApiError } from '../errors';

const api = axios.create({
  baseURL: 'http://localhost:50001/api', // Updated port
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(new ApiError('Request configuration failed', error))
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      return Promise.reject(
        new ApiError('Unable to connect to the server. Please check your internet connection.')
      );
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