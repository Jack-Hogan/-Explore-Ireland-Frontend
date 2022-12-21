import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AttractionService } from '../_services/attraction.service';

export class Attraction {
  name: string;
  url: string;
  telephone: string;
  geo: any;
  longitude: string;
  latitude: string;
  addressRegion: string;
  addressLocality: string;
  addressCountry: string;
  tags: any[];
}


@Component({
  selector: 'app-api-location',
  templateUrl: './api-location.component.html',
  styleUrls: ['./api-location.component.css']
})
export class ApiLocationComponent implements OnInit {


  public searchWord;


  public Attractions: any[];
  public favouriteAttraction;

  public attraction: Attraction;

  public addSuccessAlert: boolean = false;


  constructor(
    private attractionService: AttractionService
  ) { }




  ngOnInit(): void {

    this.getApiLocations();
  }


  public getApiLocations() {
    this.attractionService.getAllAttractions().subscribe(
      (data) => {

        console.log(data);
        this.Attractions = data.results;
      }
    );
  }

  public addLocationToFavourites(attraction: Attraction) {

    console.log(attraction);
    this.attractionService.addAttraction(attraction).subscribe(
      (response: Attraction) => {
        console.log(response);
        this.getApiLocations;
        this.addSuccessAlert = true;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public searchAttractions(searchWord: string): void {


    console.log('Getting result for: ', this.searchWord);
    this.attractionService.searchAllAttractions(searchWord).subscribe(
      (response) => {
        this.Attractions = response.results;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }

  public clearAlert() {
    this.addSuccessAlert = false;
  }


}
