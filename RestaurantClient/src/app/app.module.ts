import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { SearchRestaurantComponent } from './restaurants/search-restaurant/search-restaurant.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { SaveRestaurantComponent } from './restaurants/save-restaurant/save-restaurant.component';

import { ErrorService } from 'app/shared/error.service';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { DishesService } from 'app/dishes/dishes.service';

import { DishesComponent } from './dishes/dishes.component';
import { DishComponent } from './dishes/dish/dish.component';
import { SaveDishComponent } from './dishes/save-dish/save-dish.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,
    SearchRestaurantComponent,
    RestaurantComponent,
    DishesComponent,
    SaveRestaurantComponent,
    DishComponent,
    SaveDishComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'restaurants', component: RestaurantsComponent},
      {path: 'restaurants/edit', component: SaveRestaurantComponent},
      {path: 'restaurants/create', component: SaveRestaurantComponent},      {path: 'dishes', component: DishesComponent},
      {path: 'dishes/create', component: SaveDishComponent},
      {path: 'dishes/edit', component: SaveDishComponent}
    ])
  ],
  providers: [ErrorService, RestaurantsService, DishesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

