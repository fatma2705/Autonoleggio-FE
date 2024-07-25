import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey: string = 'authToken';
  baseUrl = 'http://localhost:8080/api/auth';

  constructor(private httpClient: HttpClient) {}

  // Getter per ottenere il token dal localStorage
  public get tokenStorage(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Setter per impostare il token nel localStorage
  public set tokenStorage(token: string | null) {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
  }

  register(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/register`, data)
      .pipe(catchError(this.handleError));
  }

  login(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/login`, data).pipe(
      tap((result: any) => {
        this.tokenStorage = result.jwt;
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.tokenStorage = null;
  }

  isLoggedIn(): boolean {
    return this.tokenStorage !== null;
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Errore di autenticazione';
    if (error.error instanceof ErrorEvent) {
      // Errore client-side
      errorMessage = `Errore: ${error.error.message}`;
    } else if (error.error && error.error.message) {
      // Errore server-side con messaggio specifico
      errorMessage = error.error.message;
    }
    console.error('An error occurred:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getUsername(): string | null {
    const token = this.tokenStorage;
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.username;
    }
    return null;
  }

  getUserName(): string | null {
    const token = this.tokenStorage;
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log(`${decodedToken.nome} nome decoded token`);
      return this.capitalizeFirstLetter(decodedToken.nome);
    }
    return null;
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getCurrentUser(): any {
    const token = this.tokenStorage;
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log(decodedToken.currentUser);
      return decodedToken.currentUser;
    }
    return null;
  }

  isAdmin(): boolean {
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.includes('ROLE_ADMIN')) {
      return true;
    } else {
      return false;
    }
  }
}
