import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AttractionService } from '../_services/attraction.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

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


  // constructor(
  //   private AuthService: AuthService
  // ) { }



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


    console.log('Getting results', this.searchWord);
    this.attractionService.searchAllAttractions(searchWord).subscribe(
      (response) => {
        this.Attractions = response.results;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )










    // public getApiLocations(){
    //   this.attractionService.getAllAttractions().subscribe(
    //     (data) => {

    //       console.log(data);
    //       this.Attractions = data.results;
    //     }
    //   );
    // }

    // public addLocationToFavourites(attraction: Attraction){

    //   console.log(attraction);
    //   this.attractionService.addAttraction(attraction).subscribe(
    //     (response: Attraction) => {
    //       console.log(response);
    //       this.getApiLocations;
    //       this.addSuccessAlert = true;
    //     },
    //     (error: HttpErrorResponse) => {
    //       alert(error.message);
    //     }
    //   )
    // }

    // public searchAttractions(searchWord: string): void {


    //   console.log('Getting results', this.searchWord);
    //   this.attractionService.searchAllAttractions(searchWord).subscribe(
    //     (response) => {
    //       this.Attractions = response.results;
    //     },
    //     (error: HttpErrorResponse) => {
    //       alert(error.message);
    //     }
    //   )














    // const results: Attraction[] = [];
    // for(const attraction of this.Attractions){
    //   if(attraction.name.toLowerCase().indexOf(searchWord.toLowerCase())  !== -1
    //   || attraction.address.addressRegion.toLowerCase().indexOf(searchWord.toLowerCase())  !== -1
    //   || attraction.address.addressLocality.toLowerCase().indexOf(key.toLowerCase())  !== -1
    //   || attraction.tags.toLowerCase().indexOf(key.toLowerCase())  !== -1){
    //     results.push(attraction);

    //     // var latitude = parseFloat(location.latitude);
    //     // var longitude = parseFloat(location.longitude);


    //     // const marker = new google.maps.Marker({
    //     //   position: {lat: latitude,lng: longitude},
    //     //   map:this.map
    //     // }  )


    //   }
    // }
  }

  public clearAlert() {
    this.addSuccessAlert = false;
  }


}
