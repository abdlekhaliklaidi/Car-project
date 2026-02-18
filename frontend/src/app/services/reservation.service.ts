import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationRequest, ReservationResponse } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) {}

  getUserReservations(userId: number): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(`${this.apiUrl}/user/${userId}`);
  }

  getReservationByNumber(reservationNumber: string): Observable<ReservationResponse> {
    return this.http.get<ReservationResponse>(`${this.apiUrl}/number/${reservationNumber}`);
  }

  createReservation(request: ReservationRequest): Observable<ReservationResponse> {
    return this.http.post<ReservationResponse>(`${this.apiUrl}/create`, request);
  }
}
