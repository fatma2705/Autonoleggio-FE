import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtenteService } from '../../../services/utente.service';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  paymentDetails = {
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };
  creditAmount!: number;
paymentSuccess: boolean = false;
showConfirmationModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private utenteService: UtenteService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.creditAmount = +params['amount'] || 0;
    });
  }

 openConfirmation(): void {
    if (this.creditAmount <= 0) {
      console.error('Invalid credit amount');
      return;
    }

    // Mostra la modale di conferma
    this.showConfirmationModal = true;
  }

  closeConfirmation(): void {
    this.showConfirmationModal = false;
  }

  confirmPayment(): void {
  // Simula il pagamento
  console.log('Processing payment:', this.paymentDetails);

  // Ottieni l'username dell'utente
  const username = this.authService.getUsername();
  if (username) {
    // Ottieni i dati dell'utente
    this.utenteService.getUtenteByUsername(username).subscribe({
      next: (user) => {
        // Calcola il nuovo credito disponibile
        const nuovoCredito = (user.creditoDisponibile || 0) + this.creditAmount;

        // Aggiorna il credito dell'utente
        user.creditoDisponibile = nuovoCredito;

        this.utenteService.aggiornaCredito(nuovoCredito).subscribe({
          next: () => {
            console.log('Credit updated successfully');
            this.paymentSuccess = true; // Mostra il messaggio di conferma
            setTimeout(() => {
              this.router.navigate(['/user/account']); // Naviga dopo un breve ritardo
            }, 2000); // Ritardo di 2 secondi
          },
          error: (err) => {
            console.error('Error updating credit:', err);
          }
        });

        this.closeConfirmation(); // Chiudi la modale dopo la conferma
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  } else {
    console.error('Username not found');
  }
}
}