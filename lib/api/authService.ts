/**
 * Authentication service for handling login, registration, etc.
 */

import { apiClient } from './apiClient';

// Define response interfaces
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const authService = {
  /**
   * Login a user
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    // Use FormData for better compatibility with Laravel
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    
    // Make direct fetch to bypass the JSON conversion
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:8000';
    const response = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    
    return response.json();
  },

  /**
   * Direct login that tries both JSON and FormData formats for compatibility
   */
  async directLogin(email: string, password: string): Promise<LoginResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:8000';
    
    // Try with FormData first (more common with Laravel)
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      
      const formDataResponse = await fetch(`${baseUrl}/api/login`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (formDataResponse.ok) {
        return formDataResponse.json();
      }
      
      // If not ok, get error message
      const errorData = await formDataResponse.json();
      throw new Error(errorData.message || 'Login failed with FormData');
    } catch (formDataError) {
      console.error('FormData login attempt failed:', formDataError);
      
      // Try with JSON format as fallback
      const jsonResponse = await fetch(`${baseUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!jsonResponse.ok) {
        const errorData = await jsonResponse.json();
        throw new Error(errorData.message || 'Login failed with JSON');
      }
      
      return jsonResponse.json();
    }
  },

  /**
   * Register a new user
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    // Use FormData for better compatibility with Laravel
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('phone_number', data.phone_number);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('password_confirmation', data.password_confirmation);
    
    // Make direct fetch to bypass the JSON conversion
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:8000';
    const response = await fetch(`${baseUrl}/api/register`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    
    return response.json();
  }
};
