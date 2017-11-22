import { Component, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { Restaurant } from '../restaurant.interface';

@Component({
  selector: 'app-search-restaurant',
  templateUrl: './search-restaurant.component.html',
  styleUrls: ['./search-restaurant.component.css']
})
export class SearchRestaurantComponent {
  restaurantName: string;
  @Output() restaurantReceived = new EventEmitter<Restaurant>();

  constructor(private router: Router,
              private route:  ActivatedRoute,
              private restService: RestaurantsService) { }

  private create() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  private search() {
    this.restService.getRestaurant(this.restaurantName)
                    .subscribe(
                      (rest) => this.restaurantReceived.emit(rest)
                    );
  }
}
