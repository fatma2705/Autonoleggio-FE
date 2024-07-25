import { Component, OnInit } from '@angular/core';
import { PrenotazioneService } from '../../../services/prenotazione.service';
import { Prenotazione } from '../../../models/prenotazione.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../confirm/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-prenotazioni-list',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './prenotazioni-list.component.html',
  styleUrl: './prenotazioni-list.component.css'
})
export class PrenotazioniListComponent implements OnInit {
  prenotazioni: Prenotazione[] = [];

  constructor(private prenotazioneService: PrenotazioneService, private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.prenotazioneService.getPrenotazioniUtente().subscribe((data: Prenotazione[]) => {
      this.prenotazioni = data;
    });
  }

  annullaPrenotazione(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Sei sicuro di voler annullare questa prenotazione?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.prenotazioneService.annullaPrenotazione(id).subscribe(() => {
          this.prenotazioni = this.prenotazioni.filter(prenotazione => prenotazione.id !== id);
        });
      }
    });
  }


 visualizzaDettagli(id: number): void {
    this.router.navigate(['/prenotazioni/detail', id]);
  }

   goBack() {
    window.history.back();
  }

  reloadPage() {
    window.location.reload();
  }

} 