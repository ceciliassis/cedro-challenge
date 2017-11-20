import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.css']
})
export class CreateRestaurantComponent implements OnInit {
  restaurantName = '';

  constructor(private resService: RestaurantsService,
              private router: Router) { }

  ngOnInit() {
  }

  private create() {
    this.resService.createRestaurant(this.restaurantName)
                  .subscribe(
                    (data) => this.router.navigate(['/restaurants'])
                  );
  }

}
