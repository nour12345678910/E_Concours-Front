import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CandidatInfo } from '../models/CandidatInfo';
import { User } from '../models/User';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CandidatServiceService {
  private URL = environment.apiBaseUrl;
  private baseUrl = 'http://localhost:8087/api/addCandidat';
  private url2 = 'http://localhost:8087/api';




  sendEmailsToCandidats(concoursId: number, candidateEmails: string[], candidats: CandidatInfo[], users: User[]): Observable<any> {
    const emailRequest = {
      candidateEmails: candidateEmails,
      candidats: candidats,
      users: users,
    };

   return this.http.post(`${this.url2}/sendEmails/${concoursId}`, emailRequest);}






  getSuccessfulCandidat(): Observable<CandidatInfo[]> {
    return this.http.get<CandidatInfo[]>(`${this.url2}/successful-candidates`);
  }



  getCandidateSexes(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.url2}/candidates/sexes`);
  }

  getCandidateAges(): Observable<number[]> {
    return this.http.get<number[]>(`${this.url2}/candidates/ages`);
  }

  updateCandidatEtat(id: number, etat: boolean): Observable<CandidatInfo> {
    const url = `${this.url2}/${id}`;
    const body = { etat };
    return this.http.put<CandidatInfo>(url, body);
  }


  ReussiteCandidat(id: number, reussite: boolean): Observable<CandidatInfo> {
    const url = `${this.url2}/reussite/${id}`;
    const body = { reussite };
    return this.http.put<CandidatInfo>(url, body);
  }





  constructor(private http: HttpClient,private route:ActivatedRoute) {}

  httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json',
      'userId':JSON.stringify( JSON.parse(localStorage.getItem('user')).id),
      'concoursId': '' + this.route.snapshot.paramMap.get('id')
    })
  }

  ajouterCandidat(candidat: CandidatInfo, userId: number,concoursId:number): Observable<CandidatInfo> {
    const headers = new HttpHeaders({ 'userId': userId.toString(),'concoursId': concoursId.toString() });
   // const header = new HttpHeaders({ 'concoursId': concoursId.toString() });
    return this.http.post<CandidatInfo>(this.baseUrl, candidat, { headers });
  }




  getCandidatInfo(): Observable<CandidatInfo[]> {
    return this.http.get<CandidatInfo[]>(`${this.URL}/api/all`);
  }



  getCandidatInfoById(id:number): Observable<CandidatInfo> {
    return this.http.get<CandidatInfo>(`${this.URL}/api/candidats/${id}`);
  }


  getCandidatsByConcoursId(concoursId: number): Observable<CandidatInfo[]> {
    return this.http.get<CandidatInfo[]>(`${this.URL}/api/concours/${concoursId}/candidats`);
  }


}
