import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prenotazione } from '../models/prenotazione.model';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {
  private baseUrl = 'http://localhost:8080/api/prenotazione'; // Modifica l'URL base se necessario

  constructor(private http: HttpClient) {}

  // Metodo per ottenere tutte le prenotazioni per l'utente
  getPrenotazioniUtente(): Observable<Prenotazione[]> {
    return this.http.get<Prenotazione[]>(`${this.baseUrl}/listUtente`);
  }

  // Metodo per ottenere tutte le prenotazioni per l'amministratore
  getPrenotazioniAdmin(): Observable<Prenotazione[]> {
    return this.http.get<Prenotazione[]>(`${this.baseUrl}/listAdmin`);
  }

  // Metodo per inserire una nuova prenotazione
  inserisciPrenotazione(prenotazione: Prenotazione): Observable<Prenotazione> {
    return this.http.post<Prenotazione>(`${this.baseUrl}/inserisci`, prenotazione);
  }

  // Metodo per annullare una prenotazione
  annullaPrenotazione(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/annullaPrenotazione/${id}`, {});
  }

  // Metodo per modificare una prenotazione esistente
  modificaPrenotazione(prenotazione: Prenotazione): Observable<Prenotazione> {
    return this.http.put<Prenotazione>(`${this.baseUrl}`, prenotazione);
  }

  // Metodo per eliminare una prenotazione
  deletePrenotazione(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
