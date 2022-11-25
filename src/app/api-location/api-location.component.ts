import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AttractionService } from '../attraction.service';

export class Attraction{
  name: string;
  // url: string;
  // telephone: string;

  // longitude: string;
  // latitude: string;
  // addressRegion: string;
  // addressLocality: string;
  // addressCountry: string;
  // tags: string;
}


@Component({
  selector: 'app-api-location',
  templateUrl: './api-location.component.html',
  styleUrls: ['./api-location.component.css']
})
export class ApiLocationComponent implements OnInit {


  public searchWord;


  // constructor(
  //   private attractionService: AttractionService
  // ) { }


  // ngOnInit(): void {}
        

  // public getAttractions(searchWord: any){
  //   console.log('getting locations..', this.searchWord);
  //     this.attractionService.listAttractions().subscribe(

  //       (response: Attraction[]) =>{
  //         this.attractions = response;
  //       },
  //       (error: HttpErrorResponse) => {
  //         alert(error.message);
  //       }
  //     ) 
  //   }

      
  // }


  //public apiLocations: Location[];

  public Attractions: any[];
  public favouriteAttraction;


  // constructor(
  //   private httpClient: HttpClient
  // ) { }

  // ngOnInit(): void {
  //   this.getApiLocations();
  // }

  // public getApiLocations(){
  //   this.httpClient.get<any>(`https://failteireland.azure-api.net/opendata-api/v1/activities`).subscribe(
  //     (data) => {

  //       console.log(data);
  //       this.Attractions = data.results;
  //     }
  //   );
  // }

  constructor(
    private attractionService: AttractionService
  ) { }



    ngOnInit(): void {

      this.getApiLocations();
  }

  public getApiLocations(){
    this.attractionService.getAllAttractions().subscribe(
      (data) => {

        console.log(data);
        this.Attractions = data.results;
      }
    );
  }

  public addLocationToFavourites(attraction: Attraction){

    console.log(attraction);
    this.attractionService.addAttraction(attraction).subscribe(
      (response: Attraction) => {
        console.log(response);
        this.getApiLocations;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
