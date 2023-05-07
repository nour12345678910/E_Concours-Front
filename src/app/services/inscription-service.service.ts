import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class InscriptionServiceService {
  baseUrl = environment.apiBaseUrl + '/api/user';
  isLoggedIn:boolean;
    constructor(private http: HttpClient) {}

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



    // inscrire(user: User): Observable<User> {
    //   if(user.role=="CANDIDAT")
    //   return this.http.post<User>(`${this.baseUrl}`, user);
    //   else if(user.role=="ADMIN")
    //   return this.http.post<User>(`${this.baseUrl}`+ '/addAdmin', user);
    //   else if(user.role=="RESPONSABLE")
    //   return this.http.post<User>(`${this.baseUrl}`+ '/addResponsable', user);

    // }


    ajouter(user: User): Observable<User> {
      return this.http.post<User>(`${this.baseUrl}`+ '/login', user);
    }

    // login(cin: string, motdepasse: string): Observable<User> {
    //   this.isLoggedIn=true;
    //   let params = new HttpParams()
    //     .append('cin', cin)
    //     .append('motdepasse', motdepasse);

    //   return this.http.get<User>(`${this.baseUrl}`+ '/login', { params: params });

    // }
    login(params: HttpParams): Observable<User> {
      this.isLoggedIn = true;
      return this.http.post<User>(`${this.baseUrl}/login`, params);
    }

    // login(cin: string, motdepasse: string): Observable<User> {
    //   this.isLoggedIn=true;
    //   let params = new HttpParams()
    //     .append('cin', cin)
    //     .append('motdepasse', motdepasse);

    //     return this.http.get<User>(`${this.baseUrl}`+ '/login', { params: params })
    //     .pipe(
    //       tap((user: User) => console.log('L\'utilisateur ' + user.id + ' est connecté avec succès ! userId : ' + localStorage.getItem('userId'))),
    //       catchError(this.handleError<User>('login'))
    //     );

    // }
    // private handleError<T>(operation = 'operation', result?: T) {
    //   return (error: any): Observable<T> => {

    //     console.error(error);

    //     console.log(`${operation} failed: ${error.message}`);

    //     return of(result as T);
    //   };
    // }


    modifier(user:User):Observable<User>{
      return this.http.put<User>(`${this.baseUrl}`+'/update', user);
    }

    logoutUser() {
      this.isLoggedIn=false;
      localStorage.removeItem('user');

    }
  }
