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
import { DishesComponent } from './dishes/dishes.component';

import { ErrorService } from 'app/shared/error.service';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { CreateRestaurantComponent } from './restaurants/create-restaurant/create-restaurant.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,
    SearchRestaurantComponent,
    RestaurantComponent,
    DishesComponent,
    CreateRestaurantComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '',            component: HomeComponent},
      {path: 'restaurants', component: RestaurantsComponent},
      {path: 'dishes',      component: DishesComponent},
      {path: 'restaurants/create', component: CreateRestaurantComponent}
    ])
  ],
  providers: [ErrorService, RestaurantsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

