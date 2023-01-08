import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * This service uses the Failte Ireland API to search, add and deliver JSON location objects for the user to store in the database
 */
export class AttractionService {

  constructor(private httpClient: HttpClient) { }

  /**
   * 
   * @returns List of activities from the Failte Ireland API
   */
  public getAllAttractions(): Observable<any> {
    return this.httpClient.get(`https://failteireland.azure-api.net/opendata-api/v1/activities`);
  }

  /**
   * Search GET method to search over 5000 records on the Failte Ireland API
   * @param searchWord 
   * @returns results from API based on searchword provided in the search form
   */
  public searchAllAttractions(searchWord: String): Observable<any> {
    return this.httpClient.get(`https://failteireland.azure-api.net/opendata-api/v1/activities?$filter=search.ismatch('${searchWord}','tags')`);
  }

  /**
   * 
   * @param searchWord 
   * @returns results from the API based on searchWord but searches by the title/name of the activity
   */
  public searchByCity(searchWord: String): Observable<any> {
    return this.httpClient.get(`https://failteireland.azure-api.net/opendata-api/v1/activities?$filter=search.ismatch('${searchWord}','name')`);
  }

}
