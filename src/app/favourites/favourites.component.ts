import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Loader } from '@googlemaps/js-api-loader';
import { Location } from '../location';

import { LocationService } from '../location.service';
import { styles } from '../mapstyles';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  public locations: Location[];

  public editLocation: Location;
  public deleteLocation: Location;
  public viewLocation: Location;

  public arraySize;
  map: google.maps.Map;

  constructor(private locationService: LocationService) { }

  ngOnInit() {
      this.getLocations();



      let loader = new Loader({

        apiKey: 'AIzaSyAtnef-bUY0IzKCU7AB2cw51swb9sjxftA'
      })

      loader.load().then(() => {
        new google.maps.Map(document.getElementById('map'),{
          mapTypeId: 'terrain',
          center: {lat: 53.56517289887375, lng:-7.762365749791302},
          zoom: 7,
          styles: styles
        })
      })

  }

  public getLocations(): void {
    this.locationService.getLocations().subscribe(
      (response: Location[]) =>{
        this.locations = response;
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
    this.locationService.deleteLocation(locationId).subscribe(
      (response: void) => {
        console.log(response);
        this.getLocations();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }

  public searchLocations(key: string): void {


    // let loader = new Loader({
    //   apiKey: 'AIzaSyAtnef-bUY0IzKCU7AB2cw51swb9sjxftA'
    // })
  
    // loader.load().then(() => {
    //   this.map = new google.maps.Map(document.getElementById('map'),{
    //     mapTypeId: 'terrain',
    //     center: {lat: latitude, lng:longitude},
    //     zoom: 11,
    //     styles: styles
    //   })})
   
    const results: Location[] = [];
    for(const location of this.locations){
      if(location.name.toLowerCase().indexOf(key.toLowerCase())  !== -1
      || location.tags.toLowerCase().indexOf(key.toLowerCase())  !== -1
      || location.addressLocality.toLowerCase().indexOf(key.toLowerCase())  !== -1
      || location.addressRegion.toLowerCase().indexOf(key.toLowerCase())  !== -1){
        results.push(location);

        // var latitude = parseFloat(location.latitude);
        // var longitude = parseFloat(location.longitude);
      

        // const marker = new google.maps.Marker({
        //   position: {lat: latitude,lng: longitude},
        //   map:this.map
        // }  )

        
      }
    }

  }
public onViewLocation(location: Location): void{

  this.viewLocation = location;

  var latitude = parseFloat(location.geo.latitude);
  var longitude = parseFloat(location.geo.longitude);

  let loader = new Loader({
    apiKey: 'AIzaSyAtnef-bUY0IzKCU7AB2cw51swb9sjxftA'
  })

  loader.load().then(() => {
    this.map = new google.maps.Map(document.getElementById('map'),{
      mapTypeId: 'terrain',
      center: {lat: latitude, lng:longitude},
      zoom: 11,
      styles: styles
    })

    const marker = new google.maps.Marker({
      position: {lat: latitude,lng: longitude},
      map:this.map
    }  )

  })
  
}

  public onOpenModal(location: Location, mode: string): void{

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addLocationModal');
    }
    if (mode === 'edit'){
      this.editLocation = location;
      button.setAttribute('data-target', '#updateLocationModal');
    }
    if (mode === 'delete'){
      this.deleteLocation = location;
      button.setAttribute('data-target', '#deleteLocationModal');
    }

    container?.appendChild(button);
    button.click();
  }


}
