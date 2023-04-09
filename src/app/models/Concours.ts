import { SafeUrl } from "@angular/platform-browser";

export interface Concours {
  id: number;
  poste: string;
  imageData: string | null;
  description: string;
  dateExamen: Date;
  dateDelais: Date;
}



