import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant.interface';
import { RestaurantsService } from 'app/restaurants/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[];
  constructor(private restService: RestaurantsService) { }

  ngOnInit() {
    this.getRestaurants();
  }

  private getRestaurants() {
    this.restService.getRestaurants().subscribe(
      (rests) => {
        this.restaurants = rests
      }
    );
  }

  private onRestaurantReceived(rest) {
    this.restaurants = [rest];
  }

  private onRestaurantDeleted() {
    this.getRestaurants();
  }

}
