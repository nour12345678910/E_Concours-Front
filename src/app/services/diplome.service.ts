import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Diplome } from '../models/Diplome';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CandidatInfo } from '../models/CandidatInfo';

@Injectable({
  providedIn: 'root'
})
export class DiplomeService {
  private URL = environment.apiBaseUrl;
  private baseUrl = 'http://localhost:8087/api/addCandidat';



  constructor(private http: HttpClient,private route:ActivatedRoute) {}


  getdiplomeByCandidat(id :number): Observable<Diplome[]> {
    return this.http.get<Diplome[]>(`${this.URL}/api/${id}/diplome`);
  }
}
