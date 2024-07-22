import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auto } from '../../models/auto.model';
import { Localita } from '../../models/localita.enum';
import { CarService } from '../../services/car.service';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Prenotazione } from '../../models/prenotazione.model';

@Component({
  selector: 'app-auto-detail',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './auto-detail.component.html',
  styleUrl: './auto-detail.component.css'
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

  constructor(
    private route: ActivatedRoute,
    private autoService: CarService,
    private bookingService: PrenotazioneService
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
      this.selectedPickupLocation = params.get('pickupLocation')  as Localita;
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
      // Crea un oggetto PrenotazioneDTO
      const prenotazione: Prenotazione = {
        id:undefined,
        auto: this.auto,
        localitaRitiro: this.selectedPickupLocation,
        localitaConsegna: this.selectedDropoffLocation,
        dataInizio: new Date(this.selectedPickupDate),
        dataFine: new Date(this.selectedDropoffDate),
        annullata: false,
        utente : undefined
      };

      // Chiama il servizio per inserire la prenotazione
      this.bookingService.inserisciPrenotazione(prenotazione).subscribe(
        response => {
          // Successo
          console.log('Prenotazione effettuata con successo:', response);
          alert('Prenotazione effettuata con successo!');
        },
        error => {
          // Errore
          console.error('Errore durante la prenotazione:', error);
          alert('Si è verificato un errore durante la prenotazione.');
        }
      );
    } else {
      alert('Per favore, completa tutti i campi della prenotazione.');
    }
  }
}