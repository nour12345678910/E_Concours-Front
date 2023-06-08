import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionHistorique } from '../models/action-historique';
import { HistoriqueReclamation } from '../models/historique-reclamation';


@Injectable({
  providedIn: 'root'
})
export class ActionHistoriqueServiceService {

  private baseUrl = 'http://localhost:8087/api';
  private baseUrl3 = 'http://localhost:8087/api/historiquesConcours';
  private baseUrl2 = 'http://localhost:8087/api/historiquesReclamations';


  constructor(private http: HttpClient) { }

  logAction(action: string, concoursId: number) {
    const payload = { action, concoursId };
    return this.http.post<any>(`${this.baseUrl}/action`, payload);
  }

  getActionLogs(): Observable<ActionHistorique[]> {
    return this.http.get<ActionHistorique[]>(this.baseUrl3);
  }



  logActionHistorique(action: string, reclamationId: number) {
    const payload = { action, reclamationId };
    return this.http.post<any>(`${this.baseUrl}/actionReclamation`, payload);
  }

  getActionLogsReclamation(): Observable<HistoriqueReclamation[]> {
    return this.http.get<HistoriqueReclamation[]>(this.baseUrl2);
  }

  deleteHistoriqueReclamations(idf:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/deleteHistoriqueReclamation/${idf}`);
    }

    deleteHistoriqueConcours(idf:number):Observable<void>{
      return this.http.delete<void>(`${this.baseUrl}/deleteHistoriqueConcours/${idf}`);
      }


}
