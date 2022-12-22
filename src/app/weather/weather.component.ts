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
export class WeatherComponent implements OnInit {

  lat;
  lng;
  weather;

  public locations: Location[];


  weatherData?: WeatherData;
  constructor(private weatherService: WeatherService, private locationService: LocationService) { }

  ngOnInit(): void {

    this.getLocation();
    // this.weatherService.getWeatherData()
    // .subscribe({
    //   next: (response) => {
    //     this.weatherData = response;
    //     console.log(response);
    //   }
    // });

  
    // console.log(this.locations)

  }

  public getLocation(){
    if("geolocation" in navigator){
      navigator.geolocation.watchPosition((success)=>{

        this.lat = success.coords.latitude;
        this.lng = success.coords.longitude;

        this.weatherService.getCurrentLocationWeather(this.lat, this.lng).subscribe(data=>{
          this.weather = data;
        });
    })
  }
}



}
