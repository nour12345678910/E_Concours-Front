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
  private baseUrl = 'http://localhost:8087/api/candidat';


  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json',
      'userId':JSON.stringify( JSON.parse(localStorage.getItem('user')).id)
    })
  }
  createCandidat(candidat: CandidatInfo): Observable<CandidatInfo> {
    return this.http.post<CandidatInfo>(`${this.baseUrl}`, JSON.stringify(candidat), this.httpOptions);
  }

  saveCandidat(candidat: CandidatInfo): Observable<CandidatInfo> {
    return this.http.post<CandidatInfo>(`${this.baseUrl}`, candidat);

  }

  getCandidatInfo(): Observable<CandidatInfo[]> {
    return this.http.get<CandidatInfo[]>(`${this.URL}/api/all`);
  }

  // addConcours(c: CandidatInfo): Observable<CandidatInfo> {
  //   return this.http.post<CandidatInfo>(`${this.URL}/api/candidat/add`, c);
  // }

}
