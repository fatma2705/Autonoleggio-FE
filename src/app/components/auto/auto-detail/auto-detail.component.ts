import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auto } from '../../../models/auto.model';
import { Localita } from '../../../models/localita.enum';
import { CarService } from '../../../services/car.service';
import { PrenotazioneService } from '../../../services/prenotazione.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Prenotazione } from '../../../models/prenotazione.model';
import { AuthService } from '../../../auth/auth.service';
import { UtenteService } from '../../../services/utente.service';
import { Utente } from '../../../models/utente.model';
import { ConfirmModalComponent } from '../../confirm/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-auto-detail',
  standalone: true,
  imports: [FormsModule, CommonModule, ConfirmModalComponent],
  templateUrl: './auto-detail.component.html',
  styleUrls: ['./auto-detail.component.css']
})
export class AutoDetailComponent implements OnInit {
  auto!: Auto;
  locations = Object.values(Localita);
  selectedPickupLocation!: Localita;
  selectedDropoffLocation!: Localita;
  selectedPickupDate: string = '';
  selectedDropoffDate: string = '';
  showDetails: boolean = false;
  totalCost: number = 0;
  messaggio: string | null = null;
  showConfirmModal: boolean = false;
  creditoCorrente: number = 0;

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

    const username = this.authService.getUsername();
    this.utenteService.getUtenteByUsername(username!).subscribe({
      next: (utente: Utente) => {
        this.creditoCorrente = utente.creditoDisponibile; // Assumendo che il campo "credito" esista nel modello Utente
      },
      error: (err) => {
        console.error('Errore nel recuperare il credito dell\'utente:', err);
      }
    });
  }

  calculateTotalCost(): void {
    if (this.auto && this.selectedPickupDate && this.selectedDropoffDate) {
      this.totalCost = this.bookingService.calculateTotalCost(this.auto, this.selectedPickupDate, this.selectedDropoffDate);
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

  verificaCredito(): void {
    if (this.auto && this.selectedPickupDate && this.selectedDropoffDate) {
      if (this.totalCost > this.creditoCorrente) {
        this.messaggio = 'Non hai credito disponibile.';
        return;
      }

      // Se il credito è sufficiente, mostra il modal di conferma
      this.showConfirmModal = true;
    } else {
      this.messaggio = 'Per favore, completa tutti i campi della prenotazione.';
    }
  }

  handleConfirmed(): void {
    this.showConfirmModal = false;
    this.effettuaPrenotazione();
  }

  handleCancelled(): void {
    this.showConfirmModal = false;
  }

  effettuaPrenotazione(): void {
    if (this.auto && this.selectedPickupDate && this.selectedDropoffDate) {
      const username = this.authService.getUsername();
      this.utenteService.getUtenteByUsername(username!).subscribe({
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
              const nuovoCredito = this.creditoCorrente - this.totalCost;
              this.utenteService.aggiornaCredito(nuovoCredito).subscribe(
                () => {
                  this.messaggio = 'Prenotazione effettuata con successo!';
                },
                error => {
                  console.error('Errore durante l\'aggiornamento del credito:', error);
                  this.messaggio = 'Prenotazione effettuata, ma errore durante l\'aggiornamento del credito.';
                }
              );
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
