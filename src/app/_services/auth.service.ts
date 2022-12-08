import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attraction } from '../api-location/api-location.component';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }

  public addAttraction(location: Attraction): Observable<Attraction> {
    console.log(location.name)
    return this.http.post<Attraction>(`${AUTH_API}add`, location);
  }

  public getAllAttractions(): Observable<any> {
    return this.http.get(`https://failteireland.azure-api.net/opendata-api/v1/activities`);
  }

  public searchAllAttractions(searchWord: String): Observable<any> {
    return this.http.get(`https://failteireland.azure-api.net/opendata-api/v1/activities?$filter=search.ismatch('${searchWord}','tags')`);
  }
}
