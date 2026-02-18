import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-card">
          <h1>Créer un compte</h1>
          <p class="auth-subtitle">Rejoignez Moussaid Car et profitez d'avantages exclusifs</p>
          
          <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Prénom</label>
                <input 
                  type="text" 
                  class="form-control"
                  placeholder="Votre prénom"
                  [(ngModel)]="registerRequest.firstName"
                  name="firstName"
                  required
                  #firstName="ngModel"
                >
                <div class="error-message" *ngIf="firstName.invalid && firstName.touched">
                  Veuillez entrer votre prénom
                </div>
              </div>
              
              <div class="form-group">
                <label class="form-label">Nom</label>
                <input 
                  type="text" 
                  class="form-control"
                  placeholder="Votre nom"
                  [(ngModel)]="registerRequest.lastName"
                  name="lastName"
                  required
                  #lastName="ngModel"
                >
                <div class="error-message" *ngIf="lastName.invalid && lastName.touched">
                  Veuillez entrer votre nom
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Email</label>
              <input 
                type="email" 
                class="form-control"
                placeholder="votre@email.com"
                [(ngModel)]="registerRequest.email"
                name="email"
                required
                email
                #email="ngModel"
              >
              <div class="error-message" *ngIf="email.invalid && email.touched">
                Veuillez entrer un email valide
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Téléphone</label>
              <input 
                type="tel" 
                class="form-control"
                placeholder="+212 6XX XXX XXX"
                [(ngModel)]="registerRequest.phoneNumber"
                name="phoneNumber"
                required
                #phoneNumber="ngModel"
              >
              <div class="error-message" *ngIf="phoneNumber.invalid && phoneNumber.touched">
                Veuillez entrer votre numéro de téléphone
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Mot de passe</label>
              <input 
                type="password" 
                class="form-control"
                placeholder="Créez un mot de passe"
                [(ngModel)]="registerRequest.password"
                name="password"
                required
                minlength="6"
                #password="ngModel"
              >
              <div class="error-message" *ngIf="password.invalid && password.touched">
                Le mot de passe doit contenir au moins 6 caractères
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Confirmer le mot de passe</label>
              <input 
                type="password" 
                class="form-control"
                placeholder="Confirmez votre mot de passe"
                [(ngModel)]="confirmPassword"
                name="confirmPassword"
                required
                #confirm="ngModel"
              >
              <div class="error-message" *ngIf="confirmPassword !== registerRequest.password && confirm.touched">
                Les mots de passe ne correspondent pas
              </div>
            </div>
            
            <div class="form-group terms">
              <div class="checkbox-container">
                <input type="checkbox" id="terms" [(ngModel)]="acceptTerms" name="acceptTerms" required>
                <label for="terms">J'accepte les <a href="#">conditions générales</a> et la <a href="#">politique de confidentialité</a></label>
              </div>
            </div>
            
            <button 
              type="submit" 
              class="btn btn-primary btn-block"
              [disabled]="registerForm.invalid || isLoading || confirmPassword !== registerRequest.password"
            >
              <span *ngIf="!isLoading">Créer mon compte</span>
              <span *ngIf="isLoading" class="spinner-small"></span>
            </button>
          </form>
          
          <div class="auth-footer">
            <p>Vous avez déjà un compte ? <a routerLink="/login">Se connecter</a></p>
          </div>
          
          <div class="error-alert" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: calc(100vh - 200px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 24px;
      background-color: var(--background-color);
    }
    
    .auth-container {
      width: 100%;
      max-width: 480px;
    }
    
    .auth-card {
      background: var(--white);
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .auth-card h1 {
      text-align: center;
      margin-bottom: 8px;
      font-size: 1.75rem;
    }
    
    .auth-subtitle {
      text-align: center;
      color: var(--text-muted);
      margin-bottom: 32px;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    
    .terms {
      margin: 16px 0;
    }
    
    .terms label {
      font-size: 13px;
    }
    
    .auth-footer {
      text-align: center;
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid var(--border-color);
    }
    
    .auth-footer p {
      color: var(--text-muted);
      font-size: 14px;
    }
    
    .error-message {
      color: var(--error-color);
      font-size: 12px;
      margin-top: 4px;
    }
    
    .error-alert {
      background-color: #ffebee;
      color: var(--error-color);
      padding: 12px 16px;
      border-radius: 8px;
      margin-top: 16px;
      font-size: 14px;
    }
    
    .spinner-small {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: var(--white);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      display: inline-block;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    @media (max-width: 480px) {
      .auth-card {
        padding: 24px;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class RegisterComponent {
  registerRequest: RegisterRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: ''
  };
  
  confirmPassword = '';
  acceptTerms = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.register(this.registerRequest).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Erreur lors de l\'inscription. Veuillez réessayer.';
      }
    });
  }
}
