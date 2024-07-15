import { Component } from '@angular/core';
import { CarSearchComponent } from "../car/car-search/car-search.component";
import { PrenotazioniComponent } from "../prenotazioni/prenotazioni.component";
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CarSearchComponent, PrenotazioniComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {
username: string =  '';

constructor(private authService: AuthService) { }


    
    ngOnInit() {
    const username = this.authService.getUserName();
    if (username) {
      this.username = username.toUpperCase();
    }
  }

}
