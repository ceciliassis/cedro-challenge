import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from 'app/shared/restaurant.interface';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-restaurant]',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant: Restaurant;

  constructor(private resService: RestaurantsService,
              private router: Router) { }

  ngOnInit() {
  }

  public delete() {
    const ans = confirm('Tem certeza que deseja deletar o restaurante ' + this.restaurant.name + '?');
    if (ans) {
      this.resService.deleteRestaurant(this.restaurant.restaurantID)
                      .subscribe(
                         () => this.router.navigate(['restaurants?ref=1'])
                      )
    }
  }

  public edit() {

  }

}
