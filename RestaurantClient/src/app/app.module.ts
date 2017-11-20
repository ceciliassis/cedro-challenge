import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { SearchRestaurantComponent } from './restaurants/search-restaurant/search-restaurant.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { DishesComponent } from './dishes/dishes.component';

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
    RouterModule.forRoot([
      {path: '',            component: HomeComponent},
      {path: 'restaurants', component: RestaurantsComponent},
      {path: 'dishes',      component: DishesComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
