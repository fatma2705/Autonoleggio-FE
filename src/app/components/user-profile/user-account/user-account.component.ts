import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { UtenteService } from '../../../services/utente.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css'
})
export class UserAccountComponent implements OnInit {
  user: any = {};
  creditAmount!: number;
   

  constructor(private utenteService:UtenteService, private authService: AuthService,private router: Router) { }

 ngOnInit(): void {
    this.getUserData();
  }

  // Recupera i dati dell'utente
  getUserData(): void {
    const username = this.authService.getUsername(); // Ottieni il nome utente
    this.utenteService.getUtenteByUsername(username!).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }

  // Aggiungi credito all'utente
  onAddCredit(): void {
    if (this.creditAmount <= 0) {
      console.error('Credit amount must be greater than zero');
      return;
    }

    // Passa l'importo del credito come parametro
    this.router.navigate(['/user/payment'], { queryParams: { amount: this.creditAmount } });
  }
}
