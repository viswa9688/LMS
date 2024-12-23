import { ApiError } from '../utils/errors';
import api from '../utils/api';
import { AuthResponse, LoginCredentials, RegisterData } from '../types/auth';
import { User } from '../types';

class AuthService {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', credentials);
      
      if (!data.success || !data.data) {
        throw new ApiError(data.message || 'Login failed');
      }

      return this.transformUserData(data.data);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Login failed. Please try again.');
    }
  }

  async register(userData: RegisterData): Promise<User> {
    try {
      const { data } = await api.post<AuthResponse>('/auth/register', userData);
      
      if (!data.success || !data.data) {
        throw new ApiError(data.message || 'Registration failed');
      }

      return this.transformUserData(data.data);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Registration failed. Please try again.');
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  private transformUserData(data: AuthResponse['data']): User {
    return {
      id: data._id,
      email: data.email,
      name: data.name,
      role: data.role as User['role'],
      token: data.token,
    };
  }
}

export const authService = new AuthService();