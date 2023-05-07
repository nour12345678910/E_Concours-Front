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




  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }
  constructor(){
  }
}



export enum ERole {
  ADMIN= 'ADMIN',
  PARTCIPANT = 'CANDIDAT'
}









