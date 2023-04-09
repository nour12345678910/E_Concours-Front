import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Concours } from '../models/Concours';

@Injectable({
  providedIn: 'root'
})
export class ConcoursService {
  private URL = environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  private baseUrl2 = 'http://localhost:8087/api/concours';
    private baseUrl = 'http://localhost:8087/api/concours';
    private apiUrl = 'http://localhost:8087/api/concours/all';




    updateConcours(id: number, postData: FormData): Observable<Concours> {
      return this.http.put<Concours>(`${this.baseUrl}/hhh/${id}`, postData);
    }




    private handleError(error: any) {
      console.error(error);
      return throwError(error);
    }



    getConcours(id: number): Observable<Concours> {
      const url = `${this.baseUrl2}/${id}`;
      return this.http.get<Concours>(url).pipe(
        catchError(this.handleError)
      );
    }


    deleteConcours(idf:number):Observable<void>{
      return this.http.delete<void>(`${this.URL}/api/concours/delete/${idf}`);
      }


      getConcoursById(id:any): Observable<Concours> {
        return this.http.get<Concours>(`${this.URL}/api/concours/${id}`);
      }





    getAllConcours(): Observable<Concours[]> {
      return this.http.get<Concours[]>(this.apiUrl);
    }

    addConcours(poste: string, description: string, dateExamen: Date, dateDelais: Date, file: File): Observable<Concours> {
      const formData = new FormData();
      formData.append('poste', poste);
      formData.append('description', description);
      formData.append('dateExamen', dateExamen.toISOString());
      formData.append('dateDelais', dateDelais.toISOString());
      formData.append('image', file);

    return this.http.post<Concours>(`${this.URL}/api/concours/add`, formData);
  }


  updateConcourss(c:Concours, file: File): Observable<Concours> {
    const formData = new FormData();
    formData.append('id', c.id.toLocaleString());
  formData.append('poste', c.poste);
  formData.append('description', c.description);

  formData.append('image', file);
    return this.http.put<Concours>(`${this.URL}/api/concours/update`, formData);
    }


      // updateConcours(c:Concours):Observable<Concours>{
      //   return this.http.put<Concours>(`${this.URL}/api/concours/update`, c);
      //   }












  }
