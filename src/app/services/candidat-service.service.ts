import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CandidatInfo } from '../models/CandidatInfo';

@Injectable({
  providedIn: 'root'
})
export class CandidatServiceService {
  private URL = environment.apiBaseUrl;
  constructor(private http:HttpClient) { }


  getCandidatInfo():Observable<CandidatInfo[]>{
    return this.http.get<CandidatInfo[]>(`${this.URL}/api/candidat/all`);
    }

   addConcours(c:CandidatInfo):Observable<CandidatInfo>{
      return this.http.post<CandidatInfo>(`${this.URL}/api/candidat/add`, c);
      }
}
