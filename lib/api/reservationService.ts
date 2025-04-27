/**
 * Service for handling reservation-related API calls
 */

import { apiClient } from './apiClient';

export interface Reservation {
  id: number;
  payment_method: string;
  down_payment: number;
  payment_date: string;
  created_at: string;
  updated_at: string;
}

export interface ReservationsResponse {
  data: Reservation[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface ReservationResponse {
  data: Reservation;
}

export interface ReservationCreateRequest {
  unit_id: number;
  payment_method: string;
  down_payment: number;
  payment_date: string;
}

export const reservationService = {
  /**
   * Get all reservations
   */
  async getReservations(): Promise<ReservationsResponse> {
    return apiClient.get<ReservationsResponse>('reservations');
  },

  /**
   * Create a new reservation
   */
  async createReservation(data: ReservationCreateRequest): Promise<ReservationResponse> {
    return apiClient.post<ReservationResponse>('reservations', data);
  }
};
