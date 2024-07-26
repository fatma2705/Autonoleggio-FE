import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Utente } from '../models/utente.model';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {
  private baseUrl = 'http://localhost:8080/api/utente'; // Assicurati che l'URL corrisponda al tuo backend

  constructor(private http: HttpClient) { }

  // Metodo per cercare l'utente per username
  getUtenteByUsername(username: string): Observable<Utente> {
    const url = `${this.baseUrl}/username/${username}`;
    return this.http.get<Utente>(url).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

 aggiornaCredito(creditoAggiunto: number): Observable<void> {
    const url = `${this.baseUrl}/aggiornaCredito`;
    return this.http.put<void>(url, creditoAggiunto).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  // Gestore degli errori
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Errore del client
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Errore del server
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
