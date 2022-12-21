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

  public locations: Location[];


  weatherData?: WeatherData;
  constructor(private weatherService: WeatherService, private locationService: LocationService) { }

  ngOnInit(): void {
    this.weatherService.getWeatherData()
    .subscribe({
      next: (response) => {
        this.weatherData = response;
        console.log(response);
      }
    });

  
    console.log(this.locations)

  }



}
