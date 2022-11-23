import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Location } from './location';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getLocations(): Observable<Location[]>{
    return this.http.get<Location[]>(`${this.apiServerUrl}/location/all`);
  }

  public addLocation(location: Location): Observable<Location>{
    return this.http.post<Location>(`${this.apiServerUrl}/location/add`, location);
  }

  public updateLocation(location: Location): Observable<Location>{
    return this.http.put<Location>(`${this.apiServerUrl}/location/update`, location);
  }

  public deleteLocation(locationId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/location/delete/${locationId}`);
  }


}
