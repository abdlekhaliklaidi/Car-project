import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from './../services/car.service';
import { Car } from './../models/car.model';
import { ReservationSearchComponent } from './reservation-search.component';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, ReservationSearchComponent],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars: Car[] = [];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe(data => {
      this.cars = data;
    });
  }
}
