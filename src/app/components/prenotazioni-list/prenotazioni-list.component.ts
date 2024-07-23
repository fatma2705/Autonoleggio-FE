import { Component, OnInit } from '@angular/core';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { Prenotazione } from '../../models/prenotazione.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prenotazioni-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prenotazioni-list.component.html',
  styleUrl: './prenotazioni-list.component.css'
})
export class PrenotazioniListComponent implements OnInit {
  prenotazioni: Prenotazione[] = [];

  constructor(private prenotazioneService: PrenotazioneService) { }

  ngOnInit(): void {
    this.prenotazioneService.getPrenotazioniUtente().subscribe((data: Prenotazione[]) => {
      this.prenotazioni = data;
    });
  }

  annullaPrenotazione(id: number): void {
    this.prenotazioneService.annullaPrenotazione(id).subscribe(() => {
      this.prenotazioni = this.prenotazioni.filter(prenotazione => prenotazione.id !== id);
    });
  }

  visualizzaDettagli(id: number): void {
    // Implementa la navigazione ai dettagli
    // Esempio: this.router.navigate(['/prenotazioni', id]);
  }
}