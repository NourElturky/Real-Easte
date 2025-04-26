/**
 * Service for handling location-related API calls
 */

import { apiClient } from './apiClient';

export interface Location {
  id: number;
  city: string;
  neighborhood: string;
  lat: number;
  lon: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface LocationsResponse {
  data: Location[];
}

export interface LocationResponse {
  message: string;
  data: Location;
}

export interface LocationCreateRequest {
  city: string;
  neighborhood: string;
  lat: number;
  lon: number;
}

export const locationService = {
  /**
   * Get all locations
   */
  async getLocations(): Promise<LocationsResponse> {
    return apiClient.get<LocationsResponse>('locations');
  },

  /**
   * Get a single location by ID
   */
  async getLocation(id: number): Promise<LocationResponse> {
    return apiClient.get<LocationResponse>(`locations/${id}`);
  },

  /**
   * Create a new location
   */
  async createLocation(data: LocationCreateRequest): Promise<LocationResponse> {
    return apiClient.post<LocationResponse>('locations', data);
  }
};
