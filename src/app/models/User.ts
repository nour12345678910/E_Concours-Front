export class User {
  id!: number;
  cin!: string;
  email!: string;
  motdepasse!: string;
  nom!: string;
  prenom!: string;
  photo!: string;
  telephone!: string;
  role!: ERole;


  constructor(){
  }
}

export enum ERole {
  ADMIN= 'ADMIN',
  PARTCIPANT = 'CANDIDAT'
}









