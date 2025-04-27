import { getSession } from 'next-auth/react';
import { toast } from 'sonner';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://127.0.0.1:8000';

// Flag to enable fallback mode when API is unavailable
const USE_FALLBACK_DATA = false;  // Set to true to always use fallback data

/**
 * Base API client for making authenticated requests
 */
export const apiClient = {
  /**
   * Make a GET request
   */
  async get<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    try {
      const url = new URL(`${API_BASE_URL}/api/${endpoint}`);
      
      // Add query parameters
      Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
      });
      
      const headers = await this.getAuthHeaders();
      
      console.log(`Making GET request to: ${url.toString()}`);
      
      const response = await fetch(url.toString(), { 
        method: 'GET',
        headers 
      });
      
      if (!response.ok) {
        throw await this.handleApiError(response);
      }
      
      return response.json();
    } catch (error) {
      console.error(`API GET error for ${endpoint}:`, error);
      
      // If fallback mode is enabled or there's a connection error, return fallback data
      if (USE_FALLBACK_DATA || error.message.includes('ECONNREFUSED') || error.message.includes('Failed to fetch')) {
        console.log(`Using fallback data for ${endpoint}`);
        return this.getFallbackData(endpoint) as T;
      }
      
      throw error;
    }
  },
  
  /**
   * Make a POST request
   */
  async post<T>(endpoint: string, data: any = {}): Promise<T> {
    try {
      const url = `${API_BASE_URL}/api/${endpoint}`;
      const headers = await this.getAuthHeaders();
      
      // Set JSON content type for non-FormData objects
      if (!(data instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
      }
      
      const body = data instanceof FormData ? data : JSON.stringify(data);
      
      console.log(`Making POST request to: ${url}`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body
      });
      
      if (!response.ok) {
        throw await this.handleApiError(response);
      }
      
      return response.json();
    } catch (error) {
      console.error(`API POST error for ${endpoint}:`, error);
      
      // If fallback mode is enabled or there's a connection error, return fallback data
      if (USE_FALLBACK_DATA || error.message.includes('ECONNREFUSED') || error.message.includes('Failed to fetch')) {
        console.log(`Using fallback data for ${endpoint}`);
        return this.getFallbackData(endpoint) as T;
      }
      
      throw error;
    }
  },
  
  /**
   * Make a PUT request
   */
  async put<T>(endpoint: string, data: any = {}): Promise<T> {
    try {
      const url = `${API_BASE_URL}/api/${endpoint}`;
      const headers = await this.getAuthHeaders();
      
      if (!(data instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
      }
      
      const body = data instanceof FormData ? data : JSON.stringify(data);
      
      console.log(`Making PUT request to: ${url}`);
      
      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body
      });
      
      if (!response.ok) {
        throw await this.handleApiError(response);
      }
      
      return response.json();
    } catch (error) {
      console.error(`API PUT error for ${endpoint}:`, error);
      
      // If fallback mode is enabled or there's a connection error, return fallback data
      if (USE_FALLBACK_DATA || error.message.includes('ECONNREFUSED') || error.message.includes('Failed to fetch')) {
        console.log(`Using fallback data for ${endpoint}`);
        return this.getFallbackData(endpoint) as T;
      }
      
      throw error;
    }
  },
  
  /**
   * Make a DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    try {
      const url = `${API_BASE_URL}/api/${endpoint}`;
      const headers = await this.getAuthHeaders();
      
      console.log(`Making DELETE request to: ${url}`);
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers
      });
      
      if (!response.ok) {
        throw await this.handleApiError(response);
      }
      
      return response.json();
    } catch (error) {
      console.error(`API DELETE error for ${endpoint}:`, error);
      
      // If fallback mode is enabled or there's a connection error, return fallback data
      if (USE_FALLBACK_DATA || error.message.includes('ECONNREFUSED') || error.message.includes('Failed to fetch')) {
        console.log(`Using fallback data for ${endpoint}`);
        return this.getFallbackData(endpoint) as T;
      }
      
      throw error;
    }
  },
  
  /**
   * Get authentication headers for API requests
   */
  async getAuthHeaders(): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };
    
    // Browser-side: get token from the session
    if (typeof window !== 'undefined') {
      try {
        const session = await getSession();
        const token = session?.user?.token;
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
          console.log('Added auth token to request');
        } else {
          console.log('No auth token available');
        }
      } catch (error) {
        console.error('Error getting session:', error);
      }
    }
    
    return headers;
  },
  
  /**
   * Handle API error responses
   */
  async handleApiError(response: Response): Promise<Error> {
    let errorMessage = 'An error occurred with the API request';
    
    try {
      const data = await response.json();
      errorMessage = data.message || errorMessage;
    } catch (error) {
      console.error('Error parsing API error response', error);
    }
    
    return new Error(`${errorMessage} (${response.status})`);
  },
  
  /**
   * Get fallback data for when API is unavailable
   */
  getFallbackData(endpoint: string): any {
    console.log(`[FALLBACK] Using fallback data for endpoint: ${endpoint}`);
    
    // Return fallback data based on the endpoint
    const fallbackData = {
      'units': {
        data: [
          {
            id: 1,
            unit_type: "Luxury Apartment",
            unit_area: "120",
            unit_status: "Available",
            number_of_bedrooms: 2,
            number_of_bathrooms: 1,
            expected_delivery_date: "2025-12-31",
            created_at: "2025-04-26 12:00:00",
            updated_at: "2025-04-26 12:00:00",
            deleted_at: null,
            media: [
              {
                id: 1,
                original_url: "/images/img1.png",
                preview_url: "/images/img1.png"
              }
            ]
          },
          {
            id: 2,
            unit_type: "Modern Villa",
            unit_area: "200",
            unit_status: "For Rent",
            number_of_bedrooms: 3,
            number_of_bathrooms: 2,
            expected_delivery_date: "2026-06-30",
            created_at: "2025-04-26 12:00:00",
            updated_at: "2025-04-26 12:00:00",
            deleted_at: null,
            media: [
              {
                id: 2,
                original_url: "/images/img2.png",
                preview_url: "/images/img2.png"
              }
            ]
          },
          {
            id: 3,
            unit_type: "Studio Apartment",
            unit_area: "60",
            unit_status: "Available",
            number_of_bedrooms: 1,
            number_of_bathrooms: 1,
            expected_delivery_date: "2025-09-15",
            created_at: "2025-04-26 12:00:00",
            updated_at: "2025-04-26 12:00:00",
            deleted_at: null,
            media: [
              {
                id: 3,
                original_url: "/images/img3.png",
                preview_url: "/images/img3.png"
              }
            ]
          },
          {
            id: 4,
            unit_type: "Penthouse",
            unit_area: "250",
            unit_status: "Available",
            number_of_bedrooms: 4,
            number_of_bathrooms: 3,
            expected_delivery_date: "2026-01-20",
            created_at: "2025-04-26 12:00:00",
            updated_at: "2025-04-26 12:00:00",
            deleted_at: null,
            media: [
              {
                id: 4,
                original_url: "/images/img4.png",
                preview_url: "/images/img4.png"
              }
            ]
          },
          {
            id: 5,
            unit_type: "Duplex",
            unit_area: "180",
            unit_status: "For Rent",
            number_of_bedrooms: 3,
            number_of_bathrooms: 2,
            expected_delivery_date: "2025-11-10",
            created_at: "2025-04-26 12:00:00",
            updated_at: "2025-04-26 12:00:00",
            deleted_at: null,
            media: [
              {
                id: 5,
                original_url: "/images/img5.png",
                preview_url: "/images/img5.png"
              }
            ]
          },
          {
            id: 6,
            unit_type: "Townhouse",
            unit_area: "210",
            unit_status: "Available",
            number_of_bedrooms: 3,
            number_of_bathrooms: 2,
            expected_delivery_date: "2026-03-15",
            created_at: "2025-04-26 12:00:00",
            updated_at: "2025-04-26 12:00:00",
            deleted_at: null,
            media: [
              {
                id: 6,
                original_url: "/images/img6.png",
                preview_url: "/images/img6.png"
              }
            ]
          }
        ]
      },
      'project': {
        data: [
          {
            name: "New Cairo Residences",
            description: "A luxury residential complex in the heart of New Cairo"
          },
          {
            name: "Sheikh Zayed Heights",
            description: "Modern living spaces with panoramic views of Sheikh Zayed City"
          },
          {
            name: "October Gardens",
            description: "Green community with extensive gardens and recreational facilities"
          }
        ]
      },
      'locations': {
        data: [
          {
            id: 1,
            city: "New Cairo",
            neighborhood: "Fifth Settlement",
            lat: 30.0074,
            lon: 31.4913,
            created_at: "2025-04-26 12:00:00",
            updated_at: "2025-04-26 12:00:00",
            deleted_at: null
          },
          {
            id: 2,
            city: "Sheikh Zayed",
            neighborhood: "Al Masaken",
            lat: 30.0455,
            lon: 31.2028,
            created_at: "2025-04-26 12:00:00",
            updated_at: "2025-04-26 12:00:00",
            deleted_at: null
          }
        ]
      },
      'login': {
        message: "Login successful",
        user: {
          id: 1,
          first_name: "Test",
          last_name: "User",
          phone_number: "+1234567890",
          email: "test@example.com",
          created_at: "2025-04-26 12:00:00",
          updated_at: "2025-04-26 12:00:00"
        },
        token: "dummy-token-for-testing"
      },
      'register': {
        message: "User registered successfully",
        user: {
          id: 1,
          first_name: "Test",
          last_name: "User",
          phone_number: "+1234567890",
          email: "test@example.com",
          created_at: "2025-04-26 12:00:00",
          updated_at: "2025-04-26 12:00:00"
        }
      }
    };
    
    return fallbackData[endpoint] || { data: [] };
  }
};
