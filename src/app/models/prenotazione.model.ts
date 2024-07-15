import { Auto } from "./auto.model";
import { Localita } from "./localita.enum";
import { Utente } from "./utente.model";

export interface Reservation {
  id: number;
  utente: Utente;
  auto: Auto;
  dataInizio: Date;
  dataFine: Date;
  annullata: boolean;
   localitaRitiro: Localita;
    localitaConsegna: Localita;
}
