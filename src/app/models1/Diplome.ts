import { CandidatInfo } from "./CandidatInfo";

export class Diplome {
  id: number;
  diplome: string;
  specialite: string;
  faculte: string;
  anneeObtention: string;
  moyenne1: string;
  moyenne2: string;
  moyenne3: string;
  moyenneBac: string;
  candidat: CandidatInfo;
}
