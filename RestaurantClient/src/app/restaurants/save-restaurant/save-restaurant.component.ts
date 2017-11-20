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

  constructor(private resService: RestaurantsService,
              private router: Router,
              private route: ActivatedRoute) {
    this.restaurant = { restaurantID: null, dishes: null, name: '' };
    this.path = this.route.snapshot.url[1].path;
  }

  ngOnInit() {
    this.restaurant = this.path === 'edit' ?
      this.resService.getStoredRestaurant() : this.restaurant;
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
    this.resService.createRestaurant(this.restaurant.name)
                   .subscribe(
                      (data) => this.router.navigate(['/restaurants'])
                    );
  }

  private edit() {
    console.log('TODO');
  }

}
