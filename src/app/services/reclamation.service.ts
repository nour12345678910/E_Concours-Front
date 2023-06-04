import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reclamation } from '../models/Reclamation';
import { Response } from '../models/Response';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private URL = environment.apiBaseUrl;
  private RECLAMATION_API = this.URL + '/api/reclamation';
  private RECLAMATION_API2 = this.URL + '/api/response';


  constructor(private http:HttpClient) { }

  sendMessage(reclamationId: number, response: Response): Observable<Reclamation> {
    return this.http.post<Reclamation>(`${this.RECLAMATION_API2}/add/${reclamationId}`, response);
}


  addReclamation(r:Reclamation):Observable<Reclamation>{
    return this.http.post<Reclamation>(`${this.RECLAMATION_API}/add`, r);
  }

  getReclamation():Observable<Reclamation[]>{
    return this.http.get<Reclamation[]>(`${this.RECLAMATION_API}/all`);
  }

  getReclamationById(id:number):Observable<Reclamation>{
    return this.http.get<Reclamation>(`${this.RECLAMATION_API}/${id}`);
  }

  deleteReclamation(id:number):Observable<void>{
    return this.http.delete<void>(`${this.RECLAMATION_API}/delete/${id}`);
  }
}
