import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgencyService } from '../../services/agency.service';
import { SearchService } from '../../services/search.service';
import { Agency } from '../../models/agency.model';
import { SearchRequest } from '../../models/reservation.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="home">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1>Location de voiture au Maroc avec Moussaid Car</h1>
          <p class="hero-subtitle">Trouvez la voiture parfaite pour votre voyage</p>
        </div>
        
        <!-- Search Form -->
        <div class="search-form-container">
          <form class="search-form" (ngSubmit)="onSearch()">
            <!-- Pickup Location -->
            <div class="form-row">
              <div class="form-group location-group">
                <label class="form-label">Agence de départ</label>
                <div class="location-input">
                  <svg class="location-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <input 
                    type="text" 
                    class="form-control"
                    placeholder="Rechercher une agence..."
                    [(ngModel)]="pickupSearch"
                    (input)="onPickupSearch()"
                    (focus)="showPickupResults = true"
                    name="pickupSearch"
                    autocomplete="off"
                  >
                </div>
                <!-- Autocomplete Results -->
                <div class="autocomplete-results" *ngIf="showPickupResults && filteredAgencies.length > 0">
                  <div 
                    class="autocomplete-item" 
                    *ngFor="let agency of filteredAgencies"
                    (click)="selectPickupAgency(agency)"
                  >
                    <div class="agency-name">{{ agency.name }}</div>
                    <div class="agency-city">{{ agency.city }}</div>
                  </div>
                </div>
              </div>
              
              <!-- Return Location Toggle -->
              <div class="form-group return-toggle">
                <div class="checkbox-container">
                  <input 
                    type="checkbox" 
                    id="differentReturn"
                    [(ngModel)]="differentReturn"
                    name="differentReturn"
                  >
                  <label for="differentReturn">Retourner dans une agence différente</label>
                </div>
              </div>
            </div>
            
            <!-- Return Location (conditional) -->
            <div class="form-row" *ngIf="differentReturn">
              <div class="form-group location-group">
                <label class="form-label">Agence de retour</label>
                <div class="location-input">
                  <svg class="location-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <input 
                    type="text" 
                    class="form-control"
                    placeholder="Rechercher une agence..."
                    [(ngModel)]="returnSearch"
                    (input)="onReturnSearch()"
                    (focus)="showReturnResults = true"
                    name="returnSearch"
                    autocomplete="off"
                  >
                </div>
                <!-- Autocomplete Results -->
                <div class="autocomplete-results" *ngIf="showReturnResults && filteredReturnAgencies.length > 0">
                  <div 
                    class="autocomplete-item" 
                    *ngFor="let agency of filteredReturnAgencies"
                    (click)="selectReturnAgency(agency)"
                  >
                    <div class="agency-name">{{ agency.name }}</div>
                    <div class="agency-city">{{ agency.city }}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Date and Time -->
            <div class="form-row dates-row">
              <div class="form-group date-group">
                <label class="form-label">Date et heure de départ</label>
                <div class="date-time-inputs">
                  <input 
                    type="date" 
                    class="form-control date-input"
                    [(ngModel)]="pickupDate"
                    name="pickupDate"
                    [min]="minDate"
                  >
                  <input 
                    type="time" 
                    class="form-control time-input"
                    [(ngModel)]="pickupTime"
                    name="pickupTime"
                  >
                </div>
              </div>
              
              <div class="form-group date-group">
                <label class="form-label">Date et heure de retour</label>
                <div class="date-time-inputs">
                  <input 
                    type="date" 
                    class="form-control date-input"
                    [(ngModel)]="returnDate"
                    name="returnDate"
                    [min]="pickupDate || minDate"
                  >
                  <input 
                    type="time" 
                    class="form-control time-input"
                    [(ngModel)]="returnTime"
                    name="returnTime"
                  >
                </div>
              </div>
            </div>
            
            <!-- Options -->
            <div class="form-row options-row">
              <div class="checkbox-container">
                <input 
                  type="checkbox" 
                  id="driverAge"
                  [(ngModel)]="driverAge25Plus"
                  name="driverAge25Plus"
                >
                <label for="driverAge">Le conducteur a 25 ans ou plus</label>
              </div>
              
              <div class="checkbox-container">
                <input 
                  type="checkbox" 
                  id="discountCode"
                  [(ngModel)]="hasDiscountCode"
                  name="hasDiscountCode"
                >
                <label for="discountCode">J'ai un code de réduction</label>
              </div>
            </div>
            
            <!-- Discount Code Input -->
            <div class="form-row" *ngIf="hasDiscountCode">
              <div class="form-group">
                <label class="form-label">Code de réduction</label>
                <input 
                  type="text" 
                  class="form-control"
                  placeholder="Entrez votre code"
                  [(ngModel)]="discountCode"
                  name="discountCode"
                >
              </div>
            </div>
            
            <!-- Submit Button -->
            <button 
              type="submit" 
              class="btn btn-primary btn-block search-btn"
              [disabled]="!canSearch || isLoading"
            >
              <span *ngIf="!isLoading">TROUVER DES VOITURES</span>
              <span *ngIf="isLoading" class="spinner-small"></span>
            </button>
          </form>
        </div>
      </section>
      
      <!-- Quick Links Section -->
      <section class="quick-links">
        <div class="container">
          <div class="quick-links-grid">
            <div class="quick-link-card">
              <div class="quick-link-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3>Gérer votre réservation</h3>
              <p>Modifiez ou annulez votre réservation en ligne</p>
            </div>
            
            <div class="quick-link-card">
              <div class="quick-link-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3>Récupérer une facture</h3>
              <p>Téléchargez vos factures en quelques clics</p>
            </div>
            
            <div class="quick-link-card">
              <div class="quick-link-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <h3>Trouver une réponse</h3>
              <p>Consultez notre FAQ pour toutes vos questions</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Features Section -->
      <section class="features">
        <div class="container">
          <h2 class="section-title">Pourquoi choisir Moussaid Car ?</h2>
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Annulation flexible</h3>
              <p>Annulez gratuitement jusqu'à 48h avant le départ</p>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <h3>5 500 agences</h3>
              <p>Dans 170 pays à travers le monde</p>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3>Programme Preferred</h3>
              <p>Profitez d'avantages exclusifs</p>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3>QuickPass</h3>
              <p>Service rapide pour récupérer votre voiture</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      padding: 60px 24px;
      position: relative;
      min-height: 500px;
    }
    
    .hero-content {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .hero h1 {
      color: var(--white);
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 12px;
    }
    
    .hero-subtitle {
      color: rgba(255, 255, 255, 0.8);
      font-size: 1.1rem;
    }
    
    .search-form-container {
      max-width: 800px;
      margin: 0 auto;
      background: var(--white);
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    }
    
    .search-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .form-row {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
    
    .form-group {
      flex: 1;
      min-width: 250px;
      position: relative;
    }
    
    .location-group {
      flex: 2;
    }
    
    .location-input {
      position: relative;
    }
    
    .location-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--primary-color);
    }
    
    .location-input .form-control {
      padding-left: 40px;
    }
    
    .autocomplete-results {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--white);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      margin-top: 4px;
      max-height: 300px;
      overflow-y: auto;
      z-index: 100;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .autocomplete-item {
      padding: 12px 16px;
      cursor: pointer;
      border-bottom: 1px solid var(--border-color);
    }
    
    .autocomplete-item:last-child {
      border-bottom: none;
    }
    
    .autocomplete-item:hover {
      background-color: #f8f8f8;
    }
    
    .agency-name {
      font-weight: 600;
      color: var(--text-color);
    }
    
    .agency-city {
      font-size: 12px;
      color: var(--text-muted);
    }
    
    .return-toggle {
      display: flex;
      align-items: flex-end;
      padding-bottom: 8px;
    }
    
    .dates-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    
    .date-time-inputs {
      display: flex;
      gap: 8px;
    }
    
    .date-input {
      flex: 2;
    }
    
    .time-input {
      flex: 1;
    }
    
    .options-row {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }
    
    .search-btn {
      padding: 16px 32px;
      font-size: 16px;
      margin-top: 8px;
    }
    
    .spinner-small {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: var(--white);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    /* Quick Links */
    .quick-links {
      padding: 60px 24px;
      background-color: var(--white);
    }
    
    .quick-links-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      max-width: 1000px;
      margin: 0 auto;
    }
    
    .quick-link-card {
      text-align: center;
      padding: 32px 24px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .quick-link-card:hover {
      border-color: var(--primary-color);
      box-shadow: 0 4px 12px rgba(212, 0, 42, 0.1);
    }
    
    .quick-link-icon {
      color: var(--primary-color);
      margin-bottom: 16px;
    }
    
    .quick-link-card h3 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    
    .quick-link-card p {
      font-size: 13px;
      color: var(--text-muted);
    }
    
    /* Features */
    .features {
      padding: 60px 24px;
      background-color: var(--background-color);
    }
    
    .section-title {
      text-align: center;
      font-size: 1.75rem;
      margin-bottom: 40px;
      color: var(--text-color);
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      max-width: 1000px;
      margin: 0 auto;
    }
    
    .feature-item {
      text-align: center;
    }
    
    .feature-icon {
      color: var(--primary-color);
      margin-bottom: 16px;
    }
    
    .feature-item h3 {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    
    .feature-item p {
      font-size: 13px;
      color: var(--text-muted);
    }
    
    @media (max-width: 768px) {
      .hero {
        padding: 40px 16px;
      }
      
      .hero h1 {
        font-size: 1.5rem;
      }
      
      .search-form-container {
        padding: 24px 16px;
      }
      
      .dates-row {
        grid-template-columns: 1fr;
      }
      
      .quick-links-grid {
        grid-template-columns: 1fr;
      }
      
      .features-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 480px) {
      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  agencies: Agency[] = [];
  filteredAgencies: Agency[] = [];
  filteredReturnAgencies: Agency[] = [];
  
  pickupSearch = '';
  returnSearch = '';
  selectedPickupAgency: Agency | null = null;
  selectedReturnAgency: Agency | null = null;
  
  showPickupResults = false;
  showReturnResults = false;
  
  differentReturn = false;
  driverAge25Plus = true;
  hasDiscountCode = false;
  
  pickupDate = '';
  pickupTime = '10:00';
  returnDate = '';
  returnTime = '10:00';
  discountCode = '';
  
  minDate: string;
  isLoading = false;

  constructor(
    private agencyService: AgencyService,
    private searchService: SearchService,
    private router: Router
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    
    // Set default dates
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.pickupDate = this.minDate;
    this.returnDate = tomorrow.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.loadAgencies();
    
    // Close autocomplete when clicking outside
    document.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.location-group')) {
        this.showPickupResults = false;
        this.showReturnResults = false;
      }
    });
  }

  loadAgencies(): void {
    this.agencyService.getAllAgencies().subscribe({
      next: (agencies) => {
        this.agencies = agencies;
      },
      error: (error) => {
        console.error('Error loading agencies:', error);
      }
    });
  }

  onPickupSearch(): void {
    if (this.pickupSearch.length < 2) {
      this.filteredAgencies = [];
      return;
    }
    
    this.filteredAgencies = this.agencies.filter(agency =>
      agency.name.toLowerCase().includes(this.pickupSearch.toLowerCase()) ||
      agency.city.toLowerCase().includes(this.pickupSearch.toLowerCase()) ||
      (agency.airportCode && agency.airportCode.toLowerCase().includes(this.pickupSearch.toLowerCase()))
    );
    this.showPickupResults = true;
  }

  onReturnSearch(): void {
    if (this.returnSearch.length < 2) {
      this.filteredReturnAgencies = [];
      return;
    }
    
    this.filteredReturnAgencies = this.agencies.filter(agency =>
      agency.name.toLowerCase().includes(this.returnSearch.toLowerCase()) ||
      agency.city.toLowerCase().includes(this.returnSearch.toLowerCase()) ||
      (agency.airportCode && agency.airportCode.toLowerCase().includes(this.returnSearch.toLowerCase()))
    );
    this.showReturnResults = true;
  }

  selectPickupAgency(agency: Agency): void {
    this.selectedPickupAgency = agency;
    this.pickupSearch = agency.name;
    this.showPickupResults = false;
  }

  selectReturnAgency(agency: Agency): void {
    this.selectedReturnAgency = agency;
    this.returnSearch = agency.name;
    this.showReturnResults = false;
  }

  get canSearch(): boolean {
    return !!this.selectedPickupAgency && 
           !!this.pickupDate && 
           !!this.pickupTime && 
           !!this.returnDate && 
           !!this.returnTime &&
           (!this.differentReturn || !!this.selectedReturnAgency);
  }

  onSearch(): void {
    if (!this.canSearch) return;
    
    this.isLoading = true;
    
    const searchRequest: SearchRequest = {
      pickupAgencyId: this.selectedPickupAgency!.id,
      returnAgencyId: this.differentReturn && this.selectedReturnAgency 
        ? this.selectedReturnAgency.id 
        : this.selectedPickupAgency!.id,
      pickupDate: this.pickupDate,
      pickupTime: this.pickupTime,
      returnDate: this.returnDate,
      returnTime: this.returnTime,
      driverAge25Plus: this.driverAge25Plus,
      discountCode: this.hasDiscountCode ? this.discountCode : ''
    };
    
    this.searchService.setSearchData(searchRequest);
    
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/cars']);
    }, 500);
  }
}
