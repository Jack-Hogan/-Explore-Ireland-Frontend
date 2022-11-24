import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AttractionService } from '../attraction.service';

export class apiLocation{
  id: number 
  name: string;
  url: string;
  phone: string;
  longitude: string;
  latitude: string;
  addressRegion: string;
  addressLocality: string;
  addressCountry: string;
  tags: string;
}


@Component({
  selector: 'app-api-location',
  templateUrl: './api-location.component.html',
  styleUrls: ['./api-location.component.css']
})
export class ApiLocationComponent implements OnInit {

  // title: 'apiData';
  // newdata:any;


  // constructor(
  //   private _apiservie: AttractionService
  // ) { }


  // ngOnInit(): void {
  //     this._apiservie.getAttractions().subscribe(
  //       res=>{
  //         this.newdata=res;
  //       }
  //     )
  // }


  public apiLocations: apiLocation[];

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getApiLocations();
  }

  public getApiLocations(){
    this.httpClient.get<any>('https://failteireland.azure-api.net/opendata-api/v1/activities').subscribe(
      response => {
        console.log(response);
        this.apiLocations = response;
      }
    );
  }

}
