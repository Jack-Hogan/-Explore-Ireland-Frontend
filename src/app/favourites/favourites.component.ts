import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { Loader } from '@googlemaps/js-api-loader';
import { map } from 'rxjs';
import { Location } from '../location';

import { styles } from '../mapstyles';
import { WeatherData } from '../models/weather.model';
import { LocationService } from '../_services/location.service';
import { UserService } from '../_services/user.service';
import { WeatherService } from '../_services/weather.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  content?: string;


  public locations: Location[];

  public weatherData?: WeatherData;


  public editLocation: Location;
  public deleteLocation: Location;
  public viewLocation: Location;
  public weatherLocation?: Location;

  public arraySize;
  map: google.maps.Map;


  public markers: any[];



  constructor(private locationService: LocationService,private weatherService: WeatherService) { }


  ngOnInit() {
    // window.location.reload();
    this.getLocations();
    this.dropMarkers();

  }

  public dropMarkers(): void {
    //window.location.reload();

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

      // assets/map.png 
      this.locations.forEach(location => {
 
        var tags = location.tags;

        console.log(location.tags)
        if (tags.includes("Surfing")){
          typeIcon = "assets/surfing.png"
          typeIconName = "Surfing"
        }else if (tags.includes("Beach")){
          typeIcon="assets/sun-umbrella.png"
          typeIconName = "Beach"
        }else if (tags.includes("Food and Drink")){
          typeIcon="assets/dinner.png"
          typeIconName = "Food & Drink"
        }else if (tags.includes("Swimming")){
          typeIcon="assets/swimmer.png"
          typeIconName = "Swimming"
        }else if (tags.includes("Walking")){
          typeIcon="assets/hiking.png"
          typeIconName = "Walking"
        }else if (tags.includes("Golf")){
          typeIcon="assets/birdie.png"
          typeIconName = "Golf"
        }else if (tags.includes("Cycling")){
          typeIcon="assets/bicycle.png"
          typeIconName = "Cycling"
        }else{
          typeIcon="assets/map2.png"
        }

      

        console.log(location.name, location.geo)

        var latitude = parseFloat(location.geo.latitude);
        var longitude = parseFloat(location.geo.longitude);

        var marker = new google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map,
          title: location.name,
          icon: typeIcon
        });

        const contentString = '<div id="content"><app-weather></app-weather></div>'

        const infowindow = new google.maps.InfoWindow({
          content: "Greetings from " + location.name + contentString,
          ariaLabel: "Uluru",
        });
        
        marker.addListener("click", () => {

          this.onOpenModal(location, 'weather');
          // infowindow.open({
          //   anchor: marker,
          //   map,
          // });
        });
      })//end of foreach


    })
  }


  public getLocations() {
    this.locationService.getLocations().subscribe(
      (value: Location[]) => {
        this.locations = value;
        this.arraySize = this.locations.length;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  };


  public onAddLocation(addForm: NgForm): void {

    document.getElementById('add-location-form').click();
    this.locationService.addLocation(addForm.value).subscribe(
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

  public onDeleteLocation(locationId: number): void {
    console.log(location)
    this.locationService.deleteLocation(locationId).subscribe(
      (response: void) => {
        console.log(response);
        this.getLocations();
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }

  public searchLocations(key: string): void {

    const results: Location[] = [];
    for (const location of this.locations) {
      if (location.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || location.tags.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || location.addressLocality.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || location.addressRegion.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(location);
      }
    }

  }
  public onViewLocation(location: Location): void {

    this.viewLocation = location;

    var latitude = parseFloat(location.geo.latitude);
    var longitude = parseFloat(location.geo.longitude);

    this.map = new google.maps.Map(document.getElementById('map'), {
      mapTypeId: 'terrain',
      center: { lat: latitude, lng: longitude },
      zoom: 11,
      styles: styles
    })

    
    var tags = location.tags;
    var type;

    console.log(location.tags)
    if (tags.includes("Surfing")){
      type = "assets/surfing.png"
    }else if (tags.includes("Beach")){
      type="assets/sun-umbrella.png"
    }else if (tags.includes("Food and Drink")){
      type="assets/dinner.png"
    }else if (tags.includes("Swimming")){
      type="assets/swimmer.png"
    }else if (tags.includes("Walking")){
      type="assets/hiking.png"
    }else{
      type="assets/map2.png"
    }


    new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: this.map,
      icon: type
    })

  }

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

  public getLocationWeather(location: Location) {
    console.log(location.geo.latitude, location.geo.longitude)
    this.weatherService.getWeatherDataByGeo(location.geo.latitude, location.geo.longitude)
    .subscribe({
      next: (response) => {
        this.weatherData = response;
        console.log(response);
      }
    });

  
    console.log(this.locations)

  }


}
