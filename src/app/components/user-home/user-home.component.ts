import { Component } from '@angular/core';
import { SiderComponent } from '../sider/sider.component';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [SiderComponent,MatToolbar,RouterLink],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {
  slides = [
    { img: "/assets/dashboard1.jpg", caption: "Benvenuto su RentACar!" },
    { img: "/assets/dashboard2.jpg", caption: "Trova l'auto perfetta per te" },
    { img: "/assets/dashboard3.jpg", caption: "Prenota in modo facile e veloce" }
  ];
  currentIndex = 0;

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }
}



   