import { TipoAuto } from "./tipo-auto.enum";
import { TipoMotore } from "./tipo-motore.enum";

export interface Auto {
  id: number;
  targa: string;
  tipologia: TipoAuto;
  marca: string;
  modello: string;
  cilindrata: number;
  tipoMotore: TipoMotore;
  numeroPosti: number;
  cambioAutomatico: boolean;
  dataImmatricolazione: Date;
  descrizione: string;
  prezzoPerGiornata: number;
  imageUrl: string;

}
