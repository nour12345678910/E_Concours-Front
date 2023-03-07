import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Concours } from '../models/Concours';

@Injectable({
  providedIn: 'root'
})
export class ConcoursService {

  private URL = environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  getConcours():Observable<Concours[]>{
    return this.http.get<Concours[]>(`${this.URL}/api/concours/all`);
    }

   addConcours(c:Concours):Observable<Concours>{
      return this.http.post<Concours>(`${this.URL}/api/concours/add`, c);
      }

      updateConcours(c:Concours):Observable<Concours>{
        return this.http.put<Concours>(`${this.URL}/api/concours/update`, c);
        }

      deleteConcours(idf:number):Observable<void>{
        return this.http.delete<void>(`${this.URL}/api/concours/delete/${idf}`);
        }
  }

