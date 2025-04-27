/**
 * Service for handling unit-related API calls
 */

import { apiClient } from './apiClient';

// Define interfaces for the API responses
export interface Media {
  id: number;
  model_type: string;
  model_id: number;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: number;
  manipulations: any[];
  custom_properties: any[];
  generated_conversions: any[];
  responsive_images: any[];
  order_column: number;
  created_at: string;
  updated_at: string;
  original_url: string;
  preview_url: string;
}

export interface Unit {
  id: number;
  unit_type: string;
  unit_area: string;
  unit_status: string;
  number_of_bedrooms: number;
  number_of_bathrooms: number;
  expected_delivery_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  media: Media[];
}

export interface UnitsResponse {
  data: Unit[];
}

export interface UnitResponse {
  data: Unit;
}

export interface UnitCreateRequest {
  unit_type: string;
  unit_area: number;
  unit_status: string;
  number_bedrooms: number;
  number_bathrooms: number;
  expected_delivery_date: string;
  location_id: number;
  developer_id: number;
  project_id: number;
  photo?: File;
}

export const unitService = {
  /**
   * Get all units
   */
  async getUnits(): Promise<UnitsResponse> {
    return apiClient.get<UnitsResponse>('units');
  },

  /**
   * Get a single unit by ID
   */
  async getUnit(id: number): Promise<UnitResponse> {
    return apiClient.get<UnitResponse>(`units/${id}`);
  },

  /**
   * Create a new unit
   */
  async createUnit(data: UnitCreateRequest): Promise<UnitResponse> {
    const formData = new FormData();
    
    // Add all fields to the form data
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'photo' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });
    
    return apiClient.post<UnitResponse>('units', formData);
  },

  /**
   * Get unit favorites
   */
  async getFavorites(): Promise<UnitsResponse> {
    return apiClient.get<UnitsResponse>('unit_favorite');
  },

  /**
   * Add a unit to favorites
   */
  async addToFavorites(unitId: number): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>('unit_favorite', { unit_id: unitId });
  }
};
