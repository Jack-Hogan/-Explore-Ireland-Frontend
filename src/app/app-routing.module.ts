import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ApiLocationComponent } from './api-location/api-location.component';

const routes: Routes =[
  {path: 'home', component: AppComponent},
  {path: 'apiLocations', component: ApiLocationComponent},
  {path: '', component: AppComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})

export class AppRoutingModule { }
