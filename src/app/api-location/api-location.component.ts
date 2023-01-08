import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AttractionService } from '../_services/attraction.service';
import { LocationService } from '../_services/location.service';
import { Attraction } from '../models/attraction.model';


@Component({
  selector: 'app-api-location',
  templateUrl: './api-location.component.html',
  styleUrls: ['./api-location.component.css']
})
/**
 * This component functions as the entry point for all requests coming from the Failte Ireland API.
 * It works as a platform and webpage to allow users to add locations to their favourites. 
 */
export class ApiLocationComponent implements OnInit {

  public searchWord;

  public Attractions: any[];
  public attraction: Attraction;
  public favouriteAttraction;

  public addSuccessAlert: boolean = false;

  constructor(
    private attractionService: AttractionService,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {

    this.getApiLocations();
  }


  /**
   * returns list of all failte ireland activites. Results are limted to 50 by the API.
   */
  public getApiLocations() {
    this.attractionService.getAllAttractions().subscribe(
      (data) => {
        this.Attractions = data.results;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /**
   * This method adds locations to the users favourites(Spring REST API to SQL Database)
   * @param attraction 
   */
  public addLocationToFavourites(attraction: Attraction) {
    this.locationService.addLocation(attraction).subscribe(
      (response: Attraction) => {
        console.log(response);
        this.getApiLocations;
        this.addSuccessAlert = true;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    //scroll to top of page after adding favourite
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    document.body.scrollTop = 0; // For Safari
  }

  /**
   * This method takes a search word by the user and sends that request into the Failte Ireland API.
   * This method searchs the attraction 'tags' for results.
   * It uses the attraction service to make the GET request and adds the results into the Attraction array.
   * @param searchWord 
   */
  public searchAttractions(searchWord: string): void {

    console.log('Getting result for: ', this.searchWord);
    this.attractionService.searchAllAttractions(searchWord).subscribe(
      (response) => {
        this.Attractions = response.results;
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }
  /**
   * This method takes a search word by the user and sends that request into the Failte Ireland API.
   * This method searchs the attraction 'title' for results.
   * It uses the attraction service to make the GET request and adds the results into the Attraction array.
   * @param searchWord 
   */
  public searchByAddress(searchWord: string): void {


    console.log('Getting result for: ', this.searchWord);
    this.attractionService.searchByCity(searchWord).subscribe(
      (response) => {
        this.Attractions = response.results;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }

  /**
   * Method to clear 'add location successfully alert'
   */
  public clearAlert() {
    this.addSuccessAlert = false;
  }


}

