import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Dish } from 'app/shared/dish.interface';
import { DishesService } from 'app/dishes/dishes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { Restaurant } from 'app/shared/restaurant.interface';

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
  }

  private save() {
    switch (this.path) {
      // case 'edit':
        // this.edit();
        // break;
      case 'create':
        this.create();
        break;
    }
  }


  private create() {
    try {
      this.dish.dishPrice = Number(this.dish.dishPrice);
          this.dishesService.createDish(this.dish).subscribe(
      () => this.redirect()
    )
    }catch (ex) {
      alert('Por favor, digite um valor válido.');
    }
  }

  private redirect() {
    this.router.navigate(['/dishes']);
  }

  private resetDish() {
    this.dish = {
      dishID: null,
      dishName: '',
      dishPrice: null,
      restID: -1,
      restName: ''
    };
  }

  private getRestaurants() {
    this.restService.getRestaurants().subscribe(
      (rests) => this.restaurants = rests
    )
  }
}
