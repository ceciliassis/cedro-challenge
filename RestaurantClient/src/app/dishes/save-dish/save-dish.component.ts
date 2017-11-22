import { Component, OnInit } from '@angular/core';
import { Dish } from '../dish.interface';
import { DishesService } from 'app/dishes/dishes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { Restaurant } from 'app/restaurants/restaurant.interface';

@Component({
  selector: 'app-save-dish',
  templateUrl: './save-dish.component.html',
  styleUrls: ['./save-dish.component.css']
})
export class SaveDishComponent implements OnInit {
  dish: Dish;
  path: string;
  restaurants: Restaurant[];

  constructor(private dishesService: DishesService,
              private restService:   RestaurantsService,
              private router:        Router,
              private route:         ActivatedRoute) {
    this.resetDish();
    this.path = this.route.snapshot.url[1].path;
   }

  ngOnInit() {
    this.getRestaurants();
    if (this.path === 'edit') {
      this.dish = this.dishesService.getStoredDish();
    }
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
    try {
      this.dish.price = Number(this.dish.price);
          this.dishesService.createDish(this.dish)
                            .subscribe(
                              () => this.redirect()
                            )
    }catch (ex) {
      alert('Por favor, digite um valor válido.');
    }
  }

  private edit() {
    this.dishesService.editDish(this.dish).subscribe(
      () => this.redirect()
    )
  }

  private redirect() {
    this.router.navigate(['/dishes']);
  }

  private resetDish() {
    this.dish = {
      dishID: null,
      name: '',
      price: null,
      restaurantID: -1,
      restName: ''
    };
  }

  private getRestaurants() {
    this.restService.getRestaurants().subscribe(
      (rests) => {
        this.restaurants = rests
        console.log(this.restaurants);
      }
    )
  }
}
