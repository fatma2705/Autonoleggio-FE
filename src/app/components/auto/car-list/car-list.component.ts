import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { CarService } from '../../../services/car.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Localita } from '../../../models/localita.enum';
import { Router } from '@angular/router';
import { Auto } from '../../../models/auto.model';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [NgFor,CommonModule,FormsModule],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit {
      autoList: Auto[] = [];
  locations = Object.values(Localita);  // Enum come array di stringhe

  searchCriteria = {
    pickupLocation: this.locations[0],
    dropoffLocation: this.locations[0],
    pickupDate: '',
    dropoffDate: ''
  };

  constructor(private carService: CarService,private router: Router) { }

  ngOnInit(): void { }

  search(): void {
    if (this.searchCriteria.pickupDate && this.searchCriteria.dropoffDate) {
      this.carService.getAvailableAutos(this.searchCriteria.pickupDate, this.searchCriteria.dropoffDate)
        .subscribe((autos: Auto[]) => {
          this.autoList = autos;
        });
    }
  }

   viewDetails(id: number): void {
    const { pickupLocation, dropoffLocation, pickupDate, dropoffDate } = this.searchCriteria;
    this.router.navigate(['/car', id], {
      queryParams: {
        pickupLocation,
        dropoffLocation,
        pickupDate,
        dropoffDate
      }
    });
  }

}