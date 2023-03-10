import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Etablissement } from '../models/Etablissement';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

  lien: string='http://localhost:8087/etablissement';


  baseUrl = environment.apiBaseUrl + '/etablissement';
  private URL = environment.apiBaseUrl;
  constructor(private http:HttpClient) { }




  addEtablissement(e:Etablissement):Observable<Etablissement>{
    return this.http.post<Etablissement>(`${this.baseUrl}/add`, e);
    }

        updateEtablissement(e:Etablissement):Observable<Etablissement>{
          return this.http.put<Etablissement>(`${this.baseUrl}`+'/update', e);
        }


        updateEtab(etablissement:Etablissement):Observable<Etablissement>{
          return this.http.put<Etablissement>(this.lien+'/update/'+etablissement.id,etablissement);

        }


        getEtablissement():Observable<Etablissement[]>{
          return this.http.get<Etablissement[]>(`${this.URL}/etablissement/all`);
          }

          obtenirEtab(id:number):Observable<Etablissement>{
            return this.http.get<Etablissement>(this.lien+'/'+id)
          }


  }


