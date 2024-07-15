import { Auto } from "./auto.model";
import { Utente } from "./utente.model";

export interface Reservation {
  id: number;
  utente: Utente;
  auto: Auto;
  dataInizio: Date;
  dataFine: Date;
  annullata: boolean;
}
