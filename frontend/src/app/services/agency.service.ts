import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agency } from '../models/agency.model';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  private apiUrl = 'http://localhost:8080/api/agencies';

  constructor(private http: HttpClient) {}

  getAllAgencies(): Observable<Agency[]> {
    return this.http.get<Agency[]>(this.apiUrl);
  }

  searchAgencies(query: string): Observable<Agency[]> {
    return this.http.get<Agency[]>(`${this.apiUrl}/search`, {
      params: { query }
    });
  }

  getAirportAgencies(): Observable<Agency[]> {
    return this.http.get<Agency[]>(`${this.apiUrl}/airports`);
  }

  getAgencyById(id: number): Observable<Agency> {
    return this.http.get<Agency>(`${this.apiUrl}/${id}`);
  }
}
