import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Attraction } from './api-location/api-location.component';

@Injectable({
  providedIn: 'root'
})
export class AttractionService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient:HttpClient) { }

  public getAllAttractions(): Observable<any>{
    return this.httpClient.get(`https://failteireland.azure-api.net/opendata-api/v1/activities`);
  }

  public addAttraction(attraction: Attraction): Observable<Attraction>{
    return this.httpClient.post<Attraction>(`${this.apiServerUrl}/location/add`, attraction);
  }



  public deleteLocation(attractionId: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.apiServerUrl}/location/delete/${attractionId}`);
  }



}
