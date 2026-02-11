import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation-search.component.html',
  styleUrls: ['./reservation-search.component.css']
})
export class ReservationSearchComponent {

  pickupLocation = '';
  pickupDate = '';
  returnDate = '';

  search() {
    console.log('Search reservation:', {
      location: this.pickupLocation,
      pickup: this.pickupDate,
      return: this.returnDate
    });
  }
}
