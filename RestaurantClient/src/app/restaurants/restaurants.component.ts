import { Component, OnInit } from '@angular/core';

import { Restaurant } from 'app/shared/restaurant.interface';

import { RestaurantsService } from 'app/restaurants/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[];
  constructor(private resService: RestaurantsService) { }

  ngOnInit() {
    this.resService.getRestaurants().subscribe(
      (rests) => {
        this.restaurants = rests
      }
    );
  }

  private onRestaurantReceived(rest) {
    this.restaurants = [rest];
  }

}
