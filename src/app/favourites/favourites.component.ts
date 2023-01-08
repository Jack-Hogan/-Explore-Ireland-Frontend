import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { Location} from '@angular/common';
import { NgForm } from '@angular/forms';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';

import { Location } from '../models/location.model';

import { styles } from '../mapstyles';
import { WeatherData } from '../models/weather.model';
import { LocationService } from '../_services/location.service';
import { StorageService } from '../_services/storage.service';
import { WeatherService } from '../_services/weather.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  content?: string;


  public locations: Location[];

  public currentDate = new Date();

  public weatherData?: WeatherData;


  public editLocation: Location;
  public deleteLocation: Location;
  public viewLocation: Location;
  public weatherLocation?: Location;
  public arraySize;

  map: google.maps.Map;



  constructor(private locationService: LocationService, private weatherService: WeatherService) {
  }

  ngOnInit() {


    const firstTime = localStorage.getItem('key')
    if (!firstTime) {
      
      localStorage.setItem('key', 'loaded')
      location.reload()
    } else {
      localStorage.removeItem('key')
      
    }

    this.displayMapAndMarkers();
    this.getLocations();

  }


  /**
   * This method uses the location service and returns all the locations saved by the user within the mySQL database.
   * It stores the results in the local array inside the component, allowing it to be displayed in the html component.
   * It also stores the array size so we can display to the user how many saved locations they have. 
   */
  public getLocations() {
    this.locationService.getLocations().subscribe(
      (value: Location[]) => {
        console.log(value)
        this.locations = value;
        this.arraySize = this.locations.length;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
        alert(error.message);
      }
    )
  };

  /**
   * This method will drop markers for all the locations that have been saved by the user.
   * It first displays the custom Google Map by sending an API key to the loader. 
   * The map is centered in the middle of Ireland and zoom level is zet to see the whoe island.
   */
  public displayMapAndMarkers(): void {

    this.getLocations();

    let loader = new Loader({
      apiKey: 'AIzaSyAtnef-bUY0IzKCU7AB2cw51swb9sjxftA'
    })

    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: 'terrain',
        center: { lat: 53.56517289887375, lng: -7.762365749791302 },
        zoom: 7,
        styles: styles
      });

      var typeIcon: any;
      var typeIconName: any;

      //For each location a new marker will be dropped onto map.
      this.locations.forEach(location => {

        var tags = location.tags;

        //This statement checks the tags to see if they include certain string values. The icon shown wil change depending on the activity. 
        if (tags.includes("Surfing")) {
          typeIcon = "assets/surfing.png"
        } else if (tags.includes("Beach")) {
          typeIcon = "assets/sun-umbrella.png"
        } else if (tags.includes("Food and Drink")) {
          typeIcon = "assets/dinner.png"
        } else if (tags.includes("Swimming")) {
          typeIcon = "assets/swimmer.png"
        } else if (tags.includes("Walking")) {
          typeIcon = "assets/hiking.png"
        } else if (tags.includes("Golf")) {
          typeIcon = "assets/birdie.png"
        } else if (tags.includes("Cycling")) {
          typeIcon = "assets/bicycle.png"
        } else if (tags.includes("Fishing")) {
          typeIcon = "assets/fishing.png"
        } else {
          typeIcon = "assets/location.png"
        }

        //Storing the coordinates of the location into Google recongised Float value. 
        var latitude = parseFloat(location.geo.latitude);
        var longitude = parseFloat(location.geo.longitude);

        //new custom marker created and dropped onto map.
        var marker = new google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map,
          title: location.name,
          icon: typeIcon //custom icon attached to marker
        });

        //adding click listener to the marker to open the Weather modal. 
        marker.addListener("click", () => {
          this.onOpenModal(location, 'weather');
        });
      })//end of foreach location
    })//End of map loader
  }//End of method


  /**
   * This function allows users/admin to add custom markers to the map. Not fully functioning as causing SQL issues. 
   * @param addForm 
   */
  public onAddLocation(addForm: NgForm): void {

    document.getElementById('add-location-form').click();
    this.locationService.addCustomLocation(addForm.value).subscribe(
      (response: Location) => {
        console.log(response);
        this.getLocations();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  /**
   * This method deletes the location the user chooses. It sends the location ID to the REST controller and can then remove the lcoation from the database. 
   * @param locationId 
   */
  public onDeleteLocation(locationId: number): void {
    console.log(location)
    this.locationService.deleteLocation(locationId).subscribe(
      (response: void) => {
        console.log(response);
        this.getLocations();
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }

  /**
   * This method takes a search key from the user and uses that search key to push search reults into result array
   * @param key 
   */
  public searchLocations(key: string): void {

    const results: Location[] = [];
    for (const location of this.locations) {
      if (location.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        console.log(location)
        results.push(location);
      }      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    }

    //Store results in array
    this.locations = results;

    //If there are no results then reset and show all locations
    if (results.length === 0 || !key) {
      this.getLocations();
    }

  }

  /**
   * This method allows the user to view the location closer on the map.
   * This creates a new custom map with a larger zoom level and centered on the location chosen. 
   * @param location 
   */
  public onViewLocation(location: Location): void {

    this.viewLocation = location;

    //store coordinates
    var latitude = parseFloat(location.geo.latitude);
    var longitude = parseFloat(location.geo.longitude);

    //custom zoomed and centered map 
    this.map = new google.maps.Map(document.getElementById('map'), {
      mapTypeId: 'terrain',
      center: { lat: latitude, lng: longitude },
      zoom: 11,
      styles: styles
    })


    var tags = location.tags;
    var type;

    //statement to create custom marker
    if (tags.includes("Surfing")) {
      type = "assets/surfing.png"
    } else if (tags.includes("Beach")) {
      type = "assets/sun-umbrella.png"
    } else if (tags.includes("Food and Drink")) {
      type = "assets/dinner.png"
    } else if (tags.includes("Swimming")) {
      type = "assets/swimmer.png"
    } else if (tags.includes("Walking")) {
      type = "assets/hiking.png"
    } else if (tags.includes("Fishing")) {
      type = "assets/fishing.png"
    }else if (tags.includes("Golf")) {
      type = "assets/birdie.png"
    } else if (tags.includes("Cycling")) {
      type = "assets/bicycle.png"
    }  else {
      type = "assets/location.png"
    }


    //drop marker
    var marker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: this.map,
      icon: type
    })

    //scroll to top of page 
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    document.body.scrollTop = 0; // For Safari
    
    //Click Listener to open weather modal
    marker.addListener("click", () => {
      this.onOpenModal(location, 'weather');
    });
  }

  /**
   * This method controls which modal to open depending on what button is chosen on the html element.
   * It tells the html which modal to open for the user. Add, edit, delete or weather. 
   * @param location 
   * @param mode 
   */
  public onOpenModal(location: Location, mode: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addLocationModal');
    }
    if (mode === 'edit') {
      this.editLocation = location;
      button.setAttribute('data-target', '#updateLocationModal');
    }
    if (mode === 'delete') {
      this.deleteLocation = location;
      button.setAttribute('data-target', '#deleteLocationModal');
    }
    if (mode === 'weather') {
      this.weatherLocation = location;
      this.getLocationWeather(location);
      button.setAttribute('data-target', '#weatherModal');
    }

    container?.appendChild(button);
    button.click();
  }

  /**
   * This method uses the weather Service to get weather data from OpenWeatherMap API call
   * It collects the location coordinates when clicked and sends coordinates to the API and stores in a response.
   * @param location 
   */
  public getLocationWeather(location: Location) {
    this.weatherService.getWeatherDataByGeo(location.geo.latitude, location.geo.longitude)
      .subscribe({
        next: (response) => {
          this.weatherData = response;
          console.log(response);
        }
      }),
      (error: HttpErrorResponse) => {
        alert(error.message);
      };

  }


}
