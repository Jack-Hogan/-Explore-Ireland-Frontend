import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ApiLocationComponent } from './api-location/api-location.component';
import { FavouritesComponent } from './favourites/favourites.component';

const routes: Routes =[
  {path: 'home', component: AppComponent},
  {path: 'allLocations', component: ApiLocationComponent},
  {path: 'favourites', component: FavouritesComponent},
  {path: '', component: FavouritesComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})

export class AppRoutingModule { }
