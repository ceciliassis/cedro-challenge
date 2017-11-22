import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Restaurant } from 'app/shared/restaurant.interface';

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
    this.restaurant = { restaurantID: null, dishes: null, name: '' };
    this.path = this.route.snapshot.url[1].path;
  }

  ngOnInit() {
    this.restaurant = this.path === 'edit' ?
      this.restService.getStoredRestaurant() : this.restaurant;
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
