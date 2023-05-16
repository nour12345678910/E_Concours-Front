import { SafeUrl } from "@angular/platform-browser";

export class Concours {
  id!: number;
  poste!: string;
  image!: string;
  description!: string;
  dateExamen!: Date;
  dateDelais!: Date;
  photoUrl!: SafeUrl;
  formule:string;


  constructor(){
  }
}
