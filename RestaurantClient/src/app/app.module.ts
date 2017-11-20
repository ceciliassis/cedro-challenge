import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { SearchRestaurantComponent } from './restaurants/search-restaurant/search-restaurant.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { DishesComponent } from './dishes/dishes.component';

import { ErrorService } from 'app/shared/error.service';
import { RestaurantsService } from 'app/restaurants/restaurants.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,
    SearchRestaurantComponent,
    RestaurantComponent,
    DishesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot([
      {path: '',            component: HomeComponent},
      {path: 'restaurants', component: RestaurantsComponent},
      {path: 'dishes',      component: DishesComponent}
    ])
  ],
  providers: [ErrorService, RestaurantsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

