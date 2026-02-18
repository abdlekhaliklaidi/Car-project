import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
          <h4>À propos</h4>
          <ul>
            <li><a href="#">Qui sommes-nous</a></li>
            <li><a href="#">Nos agences</a></li>
            <li><a href="#">Carrières</a></li>
            <li><a href="#">Presse</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Services</h4>
          <ul>
            <li><a href="#">Location de voiture</a></li>
            <li><a href="#">Location utilitaire</a></li>
            <li><a href="#">Entreprise</a></li>
            <li><a href="#">Avis Preferred</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Aide</h4>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Conditions générales</a></li>
            <li><a href="#">Politique de confidentialité</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Suivez-nous</h4>
          <div class="social-links">
            <a href="#" class="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="white" stroke-width="2"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" stroke-width="2" stroke-linecap="round"></line>
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2024 Moussaid Car. Tous droits réservés.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--secondary-color);
      color: var(--white);
      padding: 48px 24px 24px;
    }
    
    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;
    }
    
    .footer-section h4 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 16px;
      color: var(--white);
    }
    
    .footer-section ul {
      list-style: none;
    }
    
    .footer-section li {
      margin-bottom: 8px;
    }
    
    .footer-section a {
      color: #AAAAAA;
      font-size: 14px;
      transition: color 0.3s ease;
    }
    
    .footer-section a:hover {
      color: var(--white);
      text-decoration: none;
    }
    
    .social-links {
      display: flex;
      gap: 12px;
    }
    
    .social-link {
      width: 40px;
      height: 40px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s ease;
    }
    
    .social-link:hover {
      background-color: var(--primary-color);
    }
    
    .footer-bottom {
      max-width: 1200px;
      margin: 32px auto 0;
      padding-top: 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
    }
    
    .footer-bottom p {
      color: #888888;
      font-size: 13px;
    }
    
    @media (max-width: 768px) {
      .footer-container {
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
      }
    }
    
    @media (max-width: 480px) {
      .footer-container {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FooterComponent {}
