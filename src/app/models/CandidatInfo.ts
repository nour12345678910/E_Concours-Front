import { User } from "./User";

export class CandidatInfo extends User {
  sex!: string;
  dateNaissance!: Date;
  placeNaissnce!: string;
  statutCivil!: string;
  adress!: Date;
  ville!: string;
  etatVille!: string;
  zipCode!: string;


  constructor() {
    super(); // call the parent constructor
    // add your constructor logic here
  }



}
