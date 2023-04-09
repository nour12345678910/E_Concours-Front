import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CandidatInfo } from '../models/CandidatInfo';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class CandidatServiceService {
  private URL = environment.apiBaseUrl;
  private baseUrl = 'http://localhost:8087/api/addCandidat';



  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json',
      'userId':JSON.stringify( JSON.parse(localStorage.getItem('user')).id)
    })
  }

  ajouterCandidat(candidat: CandidatInfo, userId: number): Observable<CandidatInfo> {
    const headers = new HttpHeaders({ 'userId': userId.toString() });

    return this.http.post<CandidatInfo>(this.baseUrl, candidat, { headers });
  }

  getCandidatInfo(): Observable<CandidatInfo[]> {
    return this.http.get<CandidatInfo[]>(`${this.URL}/api/all`);
  }

}
