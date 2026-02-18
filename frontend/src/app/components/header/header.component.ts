import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="header-container">
        <div class="header-left">
          <button class="menu-btn" (click)="toggleMenu()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <a routerLink="/" class="logo">
            <span class="logo-text">Moussaid Car</span>
          </a>
        </div>
        
        <div class="header-right">
          <ng-container *ngIf="currentUser$ | async as user; else loginTemplate">
            <div class="user-menu">
              <span class="user-name">{{ user.firstName }}</span>
              <button class="btn btn-outline btn-sm" (click)="logout()">Déconnexion</button>
            </div>
          </ng-container>
          <ng-template #loginTemplate>
            <button class="btn btn-outline btn-sm" routerLink="/login">
              Se connecter
            </button>
          </ng-template>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      <div class="mobile-menu" [class.open]="menuOpen">
        <nav class="mobile-nav">
          <a routerLink="/" (click)="closeMenu()">Accueil</a>
          <a routerLink="/cars" (click)="closeMenu()">Nos véhicules</a>
          <a routerLink="/my-reservations" (click)="closeMenu()" *ngIf="currentUser$ | async">Mes réservations</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: var(--white);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    
    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 24px;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .header-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .menu-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-color);
    }
    
    .menu-btn:hover {
      color: var(--primary-color);
    }
    
    .logo {
      text-decoration: none;
    }
    
    .logo-text {
      font-size: 20px;
      font-weight: 700;
      color: var(--primary-color);
      letter-spacing: -0.5px;
    }
    
    .header-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .user-menu {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .user-name {
      font-weight: 500;
      color: var(--text-color);
    }
    
    .btn-sm {
      padding: 8px 16px;
      font-size: 12px;
    }
    
    .mobile-menu {
      display: none;
      background-color: var(--white);
      border-top: 1px solid var(--border-color);
      padding: 16px 24px;
    }
    
    .mobile-menu.open {
      display: block;
    }
    
    .mobile-nav {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .mobile-nav a {
      color: var(--text-color);
      font-weight: 500;
      padding: 8px 0;
    }
    
    .mobile-nav a:hover {
      color: var(--primary-color);
      text-decoration: none;
    }
    
    @media (max-width: 768px) {
      .header-container {
        padding: 12px 16px;
      }
      
      .logo-text {
        font-size: 18px;
      }
    }
  `]
})
export class HeaderComponent {
  menuOpen = false;
  currentUser$ = this.authService.currentUser$;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
