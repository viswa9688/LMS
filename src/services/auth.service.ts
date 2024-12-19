import { ApiError } from '../utils/errors';
import api from './api';
import { AuthResponse, LoginCredentials, RegisterData } from '../types/auth';
import { User } from '../types';

class AuthService {
  private tokenKey = 'token';

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', credentials);
      
      if (!data.success || !data.data) {
        throw new ApiError(data.message || 'Login failed');
      }

      this.setToken(data.data.token);
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

      this.setToken(data.data.token);
      return this.transformUserData(data.data);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Registration failed. Please try again.');
    }
  }

  logout(): void {
    this.clearToken();
  }

  private transformUserData(data: AuthResponse['data']): User {
    return {
      id: data._id,
      email: data.email,
      name: data.name,
      role: data.role as User['role'],
    };
  }
}

export const authService = new AuthService();