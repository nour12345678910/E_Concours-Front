import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { ERole, User } from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class InscriptionServiceService {
  baseUrl = environment.apiBaseUrl + '/api/user';
  isLoggedIn:boolean;
  public user: Observable<User>;
  userId:string='';
  use:User;

    constructor(private http: HttpClient) {}



    isCandidat(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return user && user.role === 'CANDIDAT';
    }

    isAdmin(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return user && user.role === 'ADMIN';
    }


    getLoggedInUser(cin: string, motdepasse: string): Observable<User> {
      const body = { cin, motdepasse };

      return this.http.post<User>(`${this.baseUrl}/login`, body).pipe(
        map(user => {
          if (user) {
            let role: ERole = ERole.ADMIN;
            return user;
          } else {
            return null;
          }
        })
      );
    }








    isLoggedInn(): boolean {
      const user = localStorage.getItem('user');
      return user !== null;
    }

    resetPassword(email: string) {
      return this.http.post(`${this.baseUrl}/reset-password`, { email });
    }


    inscrire(user: User,image: File): Observable<User> {
      const formData = new FormData();
      formData.append('cin',user.cin );
      formData.append('nom',user.nom );
      formData.append('prenom',user.prenom);
      formData.append('telephone',user.telephone );
      formData.append('motdepasse',user.motdepasse );
      formData.append('email',user.email );
      formData.append('photo',image );
      formData.append('role',"CANDIDAT" );
      return this.http.post<User>(`${this.baseUrl}`, formData);
    }






    ajouter(user: User): Observable<User> {
      return this.http.post<User>(`${this.baseUrl}`+ '/login', user);
    }


    login(params: HttpParams): Observable<User> {
      this.isLoggedIn = true;
      return this.http.post<User>(`${this.baseUrl}/login`, params);
    }



    modifier(user:User):Observable<User>{
      return this.http.put<User>(`${this.baseUrl}`+'/update', user);
    }

    logoutUser() {
      this.isLoggedIn=false;
      localStorage.removeItem('user');

    }

  }
