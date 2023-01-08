import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//API Url to test 
const API_URL = 'http://localhost:8080/api/v1/';

@Injectable({
  providedIn: 'root',
})

/**
 * This Service allows certain content HTTP GET methods based on roles
 */
export class UserService {
  constructor(private http: HttpClient) {}

  //public content
  public getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'home', { responseType: 'text' });
  }

  //user content
  public getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  //admin content
  public getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

}