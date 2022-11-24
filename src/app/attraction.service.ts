import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttractionService {

  constructor(private _http:HttpClient) { }

  getAttractions(){
    return this._http.get('https://failteireland.azure-api.net/opendata-api/v1/activities');
  }
}
