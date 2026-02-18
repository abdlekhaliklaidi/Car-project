import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'cars',
    loadComponent: () => import('./components/car-list/car-list.component').then(m => m.CarListComponent)
  },
  {
    path: 'reservation/:id',
    loadComponent: () => import('./components/reservation/reservation.component').then(m => m.ReservationComponent)
  },
  {
    path: 'my-reservations',
    loadComponent: () => import('./components/my-reservations/my-reservations.component').then(m => m.MyReservationsComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
