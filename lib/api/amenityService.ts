/**
 * Service for handling amenity-related API calls
 */

import { apiClient } from './apiClient';

export interface Amenity {
  id: number;
  name: string;
  place_type: string;
  distance: string;
  created_at: string;
  updated_at: string;
}

export interface AmenitiesResponse {
  data: Amenity[];
}

export interface AmenityResponse {
  meta: Amenity;
}

export interface AmenityCreateRequest {
  name: string;
  place_type: string;
  distance: string;
}

export const amenityService = {
  /**
   * Get all amenities
   */
  async getAmenities(): Promise<AmenitiesResponse> {
    return apiClient.get<AmenitiesResponse>('amenities');
  },

  /**
   * Create a new amenity
   */
  async createAmenity(data: AmenityCreateRequest): Promise<AmenityResponse> {
    return apiClient.post<AmenityResponse>('amenity', data);
  },

  /**
   * Get amenities for a specific unit
   */
  async getUnitAmenities(unitId: number): Promise<AmenitiesResponse> {
    return apiClient.get<AmenitiesResponse>(`units/${unitId}/amenities`);
  },

  /**
   * Add amenities to a unit
   */
  async addAmenitiesToUnit(unitId: number, amenityIds: number[]): Promise<AmenitiesResponse> {
    return apiClient.post<AmenitiesResponse>(`units/${unitId}/amenities`, {
      amenity_ids: amenityIds
    });
  }
};
