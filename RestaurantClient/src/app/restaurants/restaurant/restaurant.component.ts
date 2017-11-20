import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from 'app/shared/restaurant.interface';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-restaurant]',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant: Restaurant;

  constructor(private resService: RestaurantsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  public delete() {
    const ans = confirm('Tem certeza que deseja deletar o restaurante ' + this.restaurant.name + '?');
    if (ans) {
      this.resService.deleteRestaurant(this.restaurant.restaurantID)
                      .subscribe(
                         () =>  window.location.reload()
                      )
    }
  }

  public edit() {
    this.resService.storeRestaurant(this.restaurant);
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

}
