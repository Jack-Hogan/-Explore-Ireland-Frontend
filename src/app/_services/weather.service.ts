import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
/**
 * This Service provides the information to display realtime weather information based on the users location or the coordinates of their saved locations.
 * The service uses an OpenWeatherMap API GET methods 
 * weatherApiBaseUrl comes from enviornments/enviornments.ts/https://api.openweathermap.org/data/2.5/onecall?
 */
export class WeatherService {

  constructor(private http: HttpClient) { }


  /**
   * Method to GET weather data from API based on coordinates
   * @param lat 
   * @param lng 
   * @returns weather JSON object
   */
  public getWeatherDataByGeo(lat: String, lng: String): Observable<WeatherData> {
    return this.http.get<WeatherData>(environment.weatherApiBaseUrl + 'lat=' + lat + '&lon=' + lng + '&units=metric&appid=bd5e18debb7b855ca2a7c04542ae1089')
  }

  /**
   * Method to GET weather data from API based on user's own location given by browser request 
   * @param lat 
   * @param lng 
   * @returns weather JSON object 
   */
  public getCurrentLocationWeather(lat: String, lng: String) {
    return this.http.get(environment.currentWeatherLocationUrl + 'lat=' + lat + '&lon=' + lng + '&units=metric&appid=9e3323fb8310dc0473b40dd898d038f5')
  }
}


