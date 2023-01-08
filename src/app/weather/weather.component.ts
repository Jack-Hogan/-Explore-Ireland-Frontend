import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FavouritesComponent } from '../favourites/favourites.component';
import { WeatherData } from '../models/weather.model';
import { LocationService } from '../_services/location.service';
import { WeatherService } from '../_services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
/**
 * Weather component to gather User location information and request GET from OpenWeatherAPI
 */
export class WeatherComponent implements OnInit {

  lat;
  lng;
  weather;
  weatherData?: WeatherData;


  constructor(private weatherService: WeatherService, private locationService: LocationService) { }

  ngOnInit(): void {

    this.getLocation();

  }

  /**
   * Get location method.
   * This method prompts user for their current location inside their browser.
   * If the coordinates are retrieved they are sent to the weather Service where OpenWeatherAPI is called 
   * 
   */
  public getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((success) => {

        this.lat = success.coords.latitude;
        this.lng = success.coords.longitude;

        this.weatherService.getCurrentLocationWeather(this.lat, this.lng).subscribe(data => {
          this.weather = data;
          console.log(data)
        },
          (error: HttpErrorResponse) => {
            alert(error.message);
          });
      })
    }
  }



}
