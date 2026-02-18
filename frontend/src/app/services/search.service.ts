import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchRequest } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchDataSubject = new BehaviorSubject<SearchRequest | null>(null);
  public searchData$ = this.searchDataSubject.asObservable();

  setSearchData(data: SearchRequest): void {
    this.searchDataSubject.next(data);
    localStorage.setItem('searchData', JSON.stringify(data));
  }

  getSearchData(): SearchRequest | null {
    const stored = localStorage.getItem('searchData');
    if (stored) {
      return JSON.parse(stored);
    }
    return this.searchDataSubject.value;
  }

  clearSearchData(): void {
    this.searchDataSubject.next(null);
    localStorage.removeItem('searchData');
  }
}
