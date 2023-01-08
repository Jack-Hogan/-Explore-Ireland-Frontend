import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Location } from '../models/location.model';

import { environment } from 'src/environments/environment';
import { Attraction } from '../models/attraction.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

/**
 * Location Service which connects the front end to the REST API backend to store and search within the SQL database
 */
export class LocationService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns All locations stored in the database
   */
  public getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.apiServerUrl}/location/all`);
  }

  /**
   * Add new location to the database
   * @param location 
   */
  public addLocation(location: Attraction): Observable<Attraction> {
    return this.http.post<Attraction>(`${this.apiServerUrl}/location/add`, location);
  }

  /**
   * Adds custom location where Admin or User can add new custom locations to the database
   * @param location 
   */
  public addCustomLocation(location: Attraction): Observable<Location> {
    return this.http.post<Location>(`${this.apiServerUrl}/location/add`, location);
  }

  /**
   * Deletes a saved location inside database by taking in its ID
   * @param locationId 
   * @returns 
   */
  public deleteLocation(locationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/location/delete/${locationId}`);
  }


}
