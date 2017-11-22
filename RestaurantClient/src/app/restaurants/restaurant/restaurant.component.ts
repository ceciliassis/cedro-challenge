import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() restaurantDeleted = new EventEmitter<void>();

  constructor(private restService: RestaurantsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  public delete() {
    const ans = confirm('Tem certeza que deseja deletar o restaurante ' + this.restaurant.name + '?');
    if (ans) {
      this.restService.deleteRestaurant(this.restaurant.restaurantID)
                      .subscribe(
                        () => this.restaurantDeleted.emit()
                      );
    }
  }

  public edit() {
    this.restService.storeRestaurant(this.restaurant);
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
