import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private URL = environment.apiBaseUrl;
  private baseUrl = 'http://localhost:8087/api/user';

  constructor(private http:HttpClient) { }

  getUserById(id:any): Observable<User> {
    return this.http.get<User>(`${this.URL}/api/user/${id}`);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.URL}/api/user/all`);
  }

}
