/**
 * Service for handling search-related API calls
 */

import { apiClient } from './apiClient';
import { Unit, UnitsResponse } from './unitService';

export interface SearchFilters {
  keyword?: string;
  unit_type?: string;
  status?: 'For Sale' | 'For Rent';
  min_bedrooms?: number;
  max_bedrooms?: number;
  min_bathrooms?: number;
  max_bathrooms?: number;
  min_area?: number;
  max_area?: number;
  min_price?: number;
  max_price?: number;
}

export const searchService = {
  /**
   * Search for units based on filters
   */
  async searchUnits(filters: SearchFilters): Promise<UnitsResponse> {
    try {
      // Convert filters to API parameters
      const params: Record<string, any> = {};
      
      if (filters.keyword) params['filter[search]'] = filters.keyword;
      if (filters.unit_type) params['filter[unit_type]'] = filters.unit_type;
      if (filters.status) params['filter[unit_status]'] = filters.status === 'For Rent' ? 'For Rent' : 'Available';
      
      if (filters.min_bedrooms) params['filter[min_bedrooms]'] = filters.min_bedrooms;
      if (filters.max_bedrooms) params['filter[max_bedrooms]'] = filters.max_bedrooms;
      
      if (filters.min_bathrooms) params['filter[min_bathrooms]'] = filters.min_bathrooms;
      if (filters.max_bathrooms) params['filter[max_bathrooms]'] = filters.max_bathrooms;
      
      if (filters.min_area) params['filter[min_area]'] = filters.min_area;
      if (filters.max_area) params['filter[max_area]'] = filters.max_area;
      
      // Note: Price filters may need to be handled differently depending on your API
      if (filters.min_price) params['filter[min_price]'] = filters.min_price;
      if (filters.max_price) params['filter[max_price]'] = filters.max_price;
      
      // Make the API request
      return await apiClient.get<UnitsResponse>('units', params);
    } catch (error) {
      console.error('Error searching units:', error);
      
      // Create a fallback response with filtered mock data
      const fallbackData = apiClient.getFallbackData('units') as { data: Unit[] };
      
      // Apply filters to fallback data
      let filteredData = [...fallbackData.data];
      
      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        filteredData = filteredData.filter(unit => 
          unit.unit_type.toLowerCase().includes(keyword)
        );
      }
      
      if (filters.unit_type) {
        filteredData = filteredData.filter(unit => 
          unit.unit_type.toLowerCase() === filters.unit_type?.toLowerCase()
        );
      }
      
      if (filters.status) {
        filteredData = filteredData.filter(unit => 
          unit.unit_status === (filters.status === 'For Rent' ? 'For Rent' : 'Available')
        );
      }
      
      if (filters.min_bedrooms) {
        filteredData = filteredData.filter(unit => 
          unit.number_of_bedrooms >= (filters.min_bedrooms || 0)
        );
      }
      
      if (filters.max_bedrooms) {
        filteredData = filteredData.filter(unit => 
          unit.number_of_bedrooms <= (filters.max_bedrooms || 10)
        );
      }
      
      if (filters.min_bathrooms) {
        filteredData = filteredData.filter(unit => 
          unit.number_of_bathrooms >= (filters.min_bathrooms || 0)
        );
      }
      
      if (filters.max_bathrooms) {
        filteredData = filteredData.filter(unit => 
          unit.number_of_bathrooms <= (filters.max_bathrooms || 10)
        );
      }
      
      if (filters.min_area) {
        filteredData = filteredData.filter(unit => 
          parseInt(unit.unit_area) >= (filters.min_area || 0)
        );
      }
      
      if (filters.max_area) {
        filteredData = filteredData.filter(unit => 
          parseInt(unit.unit_area) <= (filters.max_area || 1000)
        );
      }
      
      return { data: filteredData };
    }
  }
};
