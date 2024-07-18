import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-sider',
  standalone: true,
  imports: [NgFor,NgClass],
  templateUrl: './sider.component.html',
  styleUrl: './sider.component.css'
})
export class SiderComponent implements OnInit {
  
  sliderArray: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((data: any) => {
      this.sliderArray = data.sliderArray;
    });
  }

  selectedIndex = 0;

  select(index: number): void {
    this.selectedIndex = index;
  }
}