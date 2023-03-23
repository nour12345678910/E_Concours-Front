export class CandidatInfo  {
  id:number;
  userId: number;
  sex: string;
  dateNaissance: Date;
  placeNaissnce: string;
  statutCivil: string;
  adress: Date;
  ville: string;
  etatVille: string;
  zipCode: string;


  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }


  getUserId(): number {
    return this.userId;
  }


  setUserId(value: number) {
    this.userId = value;
  }

  constructor() {

  }



}
