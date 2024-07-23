import { Inject, Injectable, inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  
  private _tokenStorage: any = null;

  public set tokenStorage(value: any) {
    this._tokenStorage = value;
  }
  
  public get tokenStorage(): any {
    return this._tokenStorage;
  }

  baseUrl = 'http://localhost:8080/api/auth';

  register(data: any){
    return this.httpClient.post(`${this.baseUrl}/register`, data);
  }

  login(data: any){
    return this.httpClient.post(`${this.baseUrl}/login`, data)
    .pipe(tap((result:any) => {
      this.tokenStorage = result.jwt;
    }));
  }

  logout(){
    this.tokenStorage = null;
  }

  isLoggedIn() {
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


  getUsername(): string  {
    const token = this.tokenStorage;
     const decodedToken: any = jwtDecode(token);
      return  decodedToken.username; 
   }

   getUserName(): string | null {
    const token = this.tokenStorage;
     const decodedToken: any = jwtDecode(token);
     console.log(decodedToken.nome + 'nome decoded token');
      return  this.capitalizeFirstLetter(decodedToken.nome); 
   }

    capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

   getCurrentUser() {
    const token = this.tokenStorage;
     const decodedToken: any = jwtDecode(token);
     console.log(decodedToken.currentUser);
      return decodedToken.currentUser; 
  }

  isAdmin(): boolean {
    if (this.getCurrentUser().includes('ROLE_ADMIN')){
      return true;
    }else {
      return false;
    }
  }
}

