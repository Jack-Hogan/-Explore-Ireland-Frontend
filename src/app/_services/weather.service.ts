import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }


  getWeatherData(): Observable<WeatherData>{
    return this.http.get<WeatherData>(environment.weatherApiBaseUrl + 'lat=54.2766&lon=8.4761&units=metric&appid=bd5e18debb7b855ca2a7c04542ae1089')
  }

  getWeatherDataByGeo(lat: String, lng: String): Observable<WeatherData>{
    return this.http.get<WeatherData>(environment.weatherApiBaseUrl + 'lat=' +lat + '&lon=' + lng + '&units=metric&appid=bd5e18debb7b855ca2a7c04542ae1089')
  }
}


