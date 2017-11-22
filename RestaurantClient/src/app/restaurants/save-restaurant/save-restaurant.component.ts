import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Restaurant } from '../restaurant.interface';

@Component({
  selector: 'app-save-restaurant',
  templateUrl: './save-restaurant.component.html',
  styleUrls: ['./save-restaurant.component.css']
})
export class SaveRestaurantComponent implements OnInit {
  restaurant: Restaurant;
  path: string;

  constructor(private restService: RestaurantsService,
              private router: Router,
              private route: ActivatedRoute) {
    this.resetRestaurant();
    this.path = this.route.snapshot.url[1].path;
  }

  ngOnInit() {
    if (this.path === 'edit') {
      this.restaurant = this.restService.getStoredRestaurant();
    }
  }

  private resetRestaurant() {
    this.restaurant = {
      restaurantID: null,
      dishes: null,
      name: '' };
  }

  private save() {
    switch (this.path) {
      case 'edit':
        this.edit();
        break;
      case 'create':
        this.create();
        break;
    }
  }

  private create() {
    this.restService.createRestaurant(this.restaurant.name)
                   .subscribe(
                      () => this.redirect()
                    );
  }

  private edit() {
    this.restService.editRestaurant(this.restaurant)
                   .subscribe(
                      () => this.redirect()
                   )
  }

  private redirect() {
    this.router.navigate(['/restaurants']);
  }

}
