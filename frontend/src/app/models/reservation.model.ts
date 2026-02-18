import { Car } from './car.model';
import { Agency } from './agency.model';

export interface SearchRequest {
  pickupAgencyId: number;
  returnAgencyId: number;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  driverAge25Plus: boolean;
  discountCode: string;
}

export interface ReservationRequest {
  carId: number;
  pickupAgencyId: number;
  returnAgencyId: number;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  paymentType: string;
  discountCode: string;
  driverAge25Plus: boolean;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface ReservationResponse {
  id: number;
  reservationNumber: string;
  car: Car;
  pickupAgency: Agency;
  returnAgency: Agency;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  totalPrice: number;
  paymentType: string;
  status: string;
  createdAt: string;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
}
