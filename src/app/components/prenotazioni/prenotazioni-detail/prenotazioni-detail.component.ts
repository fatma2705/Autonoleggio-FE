import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrenotazioneService } from '../../../services/prenotazione.service';
import { Prenotazione } from '../../../models/prenotazione.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prenotazioni-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prenotazioni-detail.component.html',
  styleUrl: './prenotazioni-detail.component.css'
})
export class PrenotazioniDetailComponent  implements OnInit {
  prenotazione!: Prenotazione;
  totalCost!: number;
  selectedPickupDate!: Date;
  selectedDropoffDate!: Date;

  constructor(
    private prenotazioneService: PrenotazioneService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      const prenotazioneId = Number(idParam); // Converti idParam in numero
      this.prenotazioneService.getPrenotazioneById(prenotazioneId).subscribe({
        next: (data: Prenotazione | undefined) => {
          if (data) {
            this.prenotazione = data;
            this.selectedPickupDate = new Date(this.prenotazione.dataInizio);
            this.selectedDropoffDate = new Date(this.prenotazione.dataFine);
            this.calculateTotalCost();
          } else {
            // Gestisci il caso in cui la prenotazione non è trovata
            console.error('Prenotazione non trovata');
            // Puoi redirigere l'utente o mostrare un messaggio di errore
          }
        },
        error: (err) => {
          console.error('Errore nel recuperare la prenotazione', err);
          // Gestisci errori di rete o API
        }
      });
    } else {
      // Gestisci il caso in cui l'ID non è presente nella route
      console.error('ID della prenotazione mancante nella route');
      // Puoi redirigere l'utente o mostrare un messaggio di errore
    }
  }

  calculateTotalCost(): void {
    if (this.prenotazione && this.prenotazione.auto) {
      this.totalCost = this.prenotazioneService.calculateTotalCost(
        this.prenotazione.auto,
        String(this.selectedPickupDate),
        String(this.selectedDropoffDate)
      );
    } else {
      this.totalCost = 0;
    }
  }
}