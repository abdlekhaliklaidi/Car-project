import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.api}/login`,
      { email, password }
    );
  }

  register(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.api}/register`,
      { email, password }
    );
  }
}
