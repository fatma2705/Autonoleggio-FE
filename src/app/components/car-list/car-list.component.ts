import { Component, OnInit } from '@angular/core';
import { Auto } from '../../models/auto.model';
import { CarService } from '../../services/car.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [NgFor,CommonModule],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit {
  autoList: Auto[] = [];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe((data: Auto[]) => {
      this.autoList = data;
    });
  }
}