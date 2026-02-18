import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car, CarCategory } from '../models/car.model';
import { SearchRequest } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:8080/api/cars';

  constructor(private http: HttpClient) {}

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  searchCars(searchRequest: SearchRequest): Observable<Car[]> {
    return this.http.post<Car[]>(`${this.apiUrl}/search`, searchRequest);
  }

  getAllCategories(): Observable<CarCategory[]> {
    return this.http.get<CarCategory[]>(`${this.apiUrl}/categories`);
  }
}
