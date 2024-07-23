import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auto } from '../../models/auto.model';
import { Localita } from '../../models/localita.enum';
import { CarService } from '../../services/car.service';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Prenotazione } from '../../models/prenotazione.model';
import { AuthService } from '../../auth/auth.service';
import { UtenteService } from '../../services/utente.service';
import { Utente } from '../../models/utente.model';

@Component({
  selector: 'app-auto-detail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auto-detail.component.html',
  styleUrls: ['./auto-detail.component.css']
})
export class AutoDetailComponent implements OnInit {
  auto!: Auto;
  locations = Object.values(Localita); // Assicurati che le località siano correttamente importate
  selectedPickupLocation!: Localita;
  selectedDropoffLocation!: Localita;
  selectedPickupDate: string = '';
  selectedDropoffDate: string = '';
  showDetails: boolean = false; // Variabile per gestire l'espansione
  totalCost: number = 0; // Prezzo totale per il periodo di noleggio
  messaggio: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private autoService: CarService,
    private bookingService: PrenotazioneService,
    private authService: AuthService,
    private utenteService: UtenteService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const autoId = params.get('id');
      if (autoId) {
        this.autoService.getAutoById(autoId).subscribe((auto: Auto) => {
          this.auto = auto;
          this.calculateTotalCost();
        });
      }
    });

    this.route.queryParamMap.subscribe(params => {
      this.selectedPickupLocation = params.get('pickupLocation') as Localita;
      this.selectedDropoffLocation = params.get('dropoffLocation') as Localita;
      this.selectedPickupDate = params.get('pickupDate') || '';
      this.selectedDropoffDate = params.get('dropoffDate') || '';
      this.calculateTotalCost();
    });
  }

  // Calcola il prezzo totale
  calculateTotalCost(): void {
    if (this.auto && this.selectedPickupDate && this.selectedDropoffDate) {
      const startDate = new Date(this.selectedPickupDate);
      const endDate = new Date(this.selectedDropoffDate);
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
      this.totalCost = days * this.auto.prezzoPerGiornata;
    } else {
      this.totalCost = 0;
    }
  }

  onDateChange(): void {
    this.calculateTotalCost();
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  prenota(): void {
    if (this.auto && this.selectedPickupDate && this.selectedDropoffDate) {
      const username = this.authService.getUsername();
      
      this.utenteService.getUtenteByUsername(username).subscribe({
        next: (utente: Utente) => {
          const prenotazione: Prenotazione = {
            id: undefined,
            auto: this.auto,
            localitaRitiro: this.selectedPickupLocation,
            localitaConsegna: this.selectedDropoffLocation,
            dataInizio: new Date(this.selectedPickupDate),
            dataFine: new Date(this.selectedDropoffDate),
            annullata: false,
            utente: utente
          };

          this.bookingService.inserisciPrenotazione(prenotazione).subscribe(
            response => {
              this.messaggio = 'Prenotazione effettuata con successo!';
            },
            error => {
              console.error('Errore durante la prenotazione:', error);
              this.messaggio = 'Si è verificato un errore durante la prenotazione.';
            }
          );
        },
        error: (err) => {
          console.error('Errore nel recuperare l\'utente:', err);
          this.messaggio = 'Errore nel recuperare l\'utente.';
        }
      });
    } else {
      this.messaggio = 'Per favore, completa tutti i campi della prenotazione.';
    }
  }
}