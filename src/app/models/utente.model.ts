export interface Utente {
  id: number;
  username: string;
  password: string;
  confermaPassword: string;
  email: string;
  nome: string;
  cognome: string;
  attivo: boolean;
  dataConseguimentoPatente: Date;
  creditoDisponibile: number;

}
