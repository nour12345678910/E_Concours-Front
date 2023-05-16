import { SafeUrl } from "@angular/platform-browser";

// export interface Concours {
//   id: number;
//   poste: string;
//   imageData: string | null;
//   description: string;
//   dateExamen: Date;
//   dateDelais: Date;
// }

export interface Concours {
  id: number;
  poste: string;
  imageData: string | null;
  description: string;
  dateExamen: Date;
  dateDelais: Date;
  image: string; // Add this property to match ConcoursResponse
  photoUrl: string; // Add this property to match ConcoursResponse
  formule:string;
}




