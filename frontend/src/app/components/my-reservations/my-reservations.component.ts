import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../services/auth.service';
import { ReservationResponse } from '../../models/reservation.model';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="my-reservations-page">
      <div class="container">
        <h1>Mes réservations</h1>
        
        <!-- Loading State -->
        <div class="loading-container" *ngIf="isLoading">
          <div class="loading-spinner">
            <div class="spinner"></div>
          </div>
          <p>Chargement de vos réservations...</p>
        </div>
        
        <!-- Reservations List -->
        <div class="reservations-list" *ngIf="!isLoading && reservations.length > 0">
          <div class="reservation-card" *ngFor="let reservation of reservations">
            <div class="reservation-header">
              <div class="reservation-number">
                <span>Réservation</span>
                <strong>{{ reservation.reservationNumber }}</strong>
              </div>
              <div class="reservation-status" [class]="'status-' + reservation.status.toLowerCase()">
                {{ getStatusLabel(reservation.status) }}
              </div>
            </div>
            
            <div class="reservation-body">
              <div class="car-info">
                <div class="car-image-placeholder" *ngIf="!reservation.car.imageUrl">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5">
                    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"></path>
                    <circle cx="6.5" cy="16.5" r="2.5"></circle>
                    <circle cx="16.5" cy="16.5" r="2.5"></circle>
                  </svg>
                </div>
                <img *ngIf="reservation.car.imageUrl" [src]="reservation.car.imageUrl" [alt]="reservation.car.name">
                <div class="car-details">
                  <h3>{{ reservation.car.name }}</h3>
                  <p>{{ reservation.car.exampleModel || reservation.car.model }}</p>
                  <span class="category">{{ reservation.car.category.nameFr || 'Véhicule' }}</span>
                </div>
              </div>
              
              <div class="rental-info">
                <div class="info-item">
                  <span class="info-label">Prise en charge</span>
                  <span class="info-value">{{ reservation.pickupDate | date:'dd/MM/yyyy' }} à {{ reservation.pickupTime }}</span>
                  <span class="info-location">{{ reservation.pickupAgency.name }}</span>
                </div>
                <div class="info-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
                <div class="info-item">
                  <span class="info-label">Retour</span>
                  <span class="info-value">{{ reservation.returnDate | date:'dd/MM/yyyy' }} à {{ reservation.returnTime }}</span>
                  <span class="info-location">{{ reservation.returnAgency.name }}</span>
                </div>
              </div>
            </div>
            
            <div class="reservation-footer">
              <div class="payment-info">
                <span class="payment-type">{{ reservation.paymentType === 'PAY_NOW' ? 'Payé en ligne' : 'Paiement en agence' }}</span>
                <span class="total-price">{{ reservation.totalPrice | currency:'MAD':'symbol':'1.2-2' }}</span>
              </div>
              <div class="reservation-actions">
                <button class="btn btn-outline btn-sm">Modifier</button>
                <button class="btn btn-outline btn-sm btn-danger">Annuler</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div class="empty-state" *ngIf="!isLoading && reservations.length === 0">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <h2>Aucune réservation</h2>
          <p>Vous n'avez pas encore de réservation. Découvrez nos véhicules et réservez dès maintenant !</p>
          <button class="btn btn-primary" routerLink="/">Réserver une voiture</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .my-reservations-page {
      padding: 40px 24px;
      background-color: var(--background-color);
      min-height: calc(100vh - 200px);
    }
    
    h1 {
      font-size: 1.75rem;
      margin-bottom: 32px;
    }
    
    .loading-container {
      text-align: center;
      padding: 60px 24px;
    }
    
    .loading-container p {
      color: var(--text-muted);
      margin-top: 16px;
    }
    
    .reservations-list {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    
    .reservation-card {
      background: var(--white);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .reservation-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      background: #f8f8f8;
      border-bottom: 1px solid var(--border-color);
    }
    
    .reservation-number {
      display: flex;
      flex-direction: column;
    }
    
    .reservation-number span {
      font-size: 11px;
      color: var(--text-muted);
      text-transform: uppercase;
    }
    
    .reservation-number strong {
      font-size: 1.1rem;
      color: var(--primary-color);
      letter-spacing: 0.5px;
    }
    
    .reservation-status {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .status-confirmed {
      background: rgba(40, 167, 69, 0.1);
      color: var(--success-color);
    }
    
    .status-pending {
      background: rgba(255, 193, 7, 0.1);
      color: var(--warning-color);
    }
    
    .status-cancelled {
      background: rgba(220, 53, 69, 0.1);
      color: var(--error-color);
    }
    
    .status-completed {
      background: rgba(108, 117, 125, 0.1);
      color: var(--text-muted);
    }
    
    .reservation-body {
      padding: 24px;
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 32px;
    }
    
    .car-info {
      display: flex;
      gap: 16px;
    }
    
    .car-info img {
      width: 100px;
      height: 70px;
      object-fit: contain;
      background: #f5f5f5;
      border-radius: 8px;
    }
    
    .car-details h3 {
      font-size: 16px;
      margin-bottom: 4px;
    }
    
    .car-details p {
      font-size: 13px;
      color: var(--text-muted);
      margin-bottom: 8px;
    }
    
    .car-details .category {
      font-size: 11px;
      background: var(--primary-color);
      color: var(--white);
      padding: 2px 8px;
      border-radius: 4px;
    }
    
    .rental-info {
      display: flex;
      align-items: center;
      gap: 24px;
    }
    
    .info-item {
      display: flex;
      flex-direction: column;
    }
    
    .info-label {
      font-size: 11px;
      color: var(--text-muted);
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    
    .info-value {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 2px;
    }
    
    .info-location {
      font-size: 12px;
      color: var(--text-light);
    }
    
    .info-arrow {
      color: var(--primary-color);
    }
    
    .reservation-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      border-top: 1px solid var(--border-color);
      background: #f8f8f8;
    }
    
    .payment-info {
      display: flex;
      flex-direction: column;
    }
    
    .payment-type {
      font-size: 12px;
      color: var(--text-muted);
    }
    
    .total-price {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-color);
    }
    
    .reservation-actions {
      display: flex;
      gap: 8px;
    }
    
    .btn-danger {
      border-color: var(--error-color);
      color: var(--error-color);
    }
    
    .btn-danger:hover {
      background: var(--error-color);
      color: var(--white);
    }
    
    .empty-state {
      text-align: center;
      padding: 60px 24px;
      background: var(--white);
      border-radius: 12px;
    }
    
    .empty-state svg {
      color: var(--text-muted);
      margin-bottom: 16px;
    }
    
    .empty-state h2 {
      margin-bottom: 8px;
    }
    
    .empty-state p {
      color: var(--text-muted);
      margin-bottom: 24px;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }
    
    @media (max-width: 768px) {
      .reservation-body {
        grid-template-columns: 1fr;
        gap: 24px;
      }
      
      .rental-info {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
      
      .info-arrow {
        transform: rotate(90deg);
      }
      
      .reservation-footer {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
      }
      
      .reservation-actions {
        justify-content: stretch;
      }
      
      .reservation-actions .btn {
        flex: 1;
      }
    }
  `]
})
export class MyReservationsComponent implements OnInit {
  reservations: ReservationResponse[] = [];
  isLoading = true;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.isLoading = false;
      return;
    }

    this.reservationService.getUserReservations(currentUser.userId).subscribe({
      next: (reservations) => {
        this.reservations = reservations;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading reservations:', error);
        this.isLoading = false;
      }
    });
  }

  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      'CONFIRMED': 'Confirmée',
      'PENDING': 'En attente',
      'CANCELLED': 'Annulée',
      'COMPLETED': 'Terminée'
    };
    return statusMap[status] || status;
  }
}
