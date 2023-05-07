import { Reclamation } from "./Reclamation";

export class Response {
  id!: number;
  message!: string;
  dateTime!: string;
  responderName!: string;
  reclamation!: Reclamation;
}
