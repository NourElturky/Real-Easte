/**
 * Service for handling developer-related API calls
 */

import { apiClient } from './apiClient';

export interface Developer {
  id: number;
  name: string;
  project_num: number;
  unit_num: number;
  phone_num: string;
  address: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface DevelopersResponse {
  data: Developer[];
}

export interface DeveloperResponse {
  message: string;
  data: Developer;
}

export interface DeveloperCreateRequest {
  name: string;
  project_num: number;
  unit_num: number;
  phone_num: string;
  address: string;
}

export const developerService = {
  /**
   * Get all developers
   */
  async getDevelopers(): Promise<DevelopersResponse> {
    return apiClient.get<DevelopersResponse>('developers');
  },

  /**
   * Get a single developer by ID
   */
  async getDeveloper(id: number): Promise<DeveloperResponse> {
    return apiClient.get<DeveloperResponse>(`developers/${id}`);
  },

  /**
   * Create a new developer
   */
  async createDeveloper(data: DeveloperCreateRequest): Promise<DeveloperResponse> {
    return apiClient.post<DeveloperResponse>('developers', data);
  }
};
