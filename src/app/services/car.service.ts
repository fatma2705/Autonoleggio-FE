import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auto } from '../models/auto.model';    

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:8080/api/auto'; // URL dell'API Spring

  constructor(private http: HttpClient) { }

  getCars(): Observable<Auto[]> {
    return this.http.get<Auto[]>(`${this.apiUrl}/listAll`);
  }

  searchCars(filters: any): Observable<Auto[]> {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.append(key, filters[key]);
      }
    });
    return this.http.post<Auto[]>(`${this.apiUrl}/search`, filters);
  }

  getAvailableAutos(dataInizio: string, dataFine: string): Observable<Auto[]> {
    let params = new HttpParams()
      .set('dataInizio', dataInizio)
      .set('dataFine', dataFine);

    return this.http.get<Auto[]>(`${this.apiUrl}/available`, { params });
  }

  getAutoById(id: string): Observable<Auto> {
    return this.http.get<Auto>(`${this.apiUrl}/${id}`);
  }
}