import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiServerUrl = environment.apiBaseUrl;


  constructor(private http: HttpClient) { }

  public getAllUsers() : Observable<User[]>{
    return this.http.get<User[]>(`${this.apiServerUrl}/admin/all`);
  }
}
