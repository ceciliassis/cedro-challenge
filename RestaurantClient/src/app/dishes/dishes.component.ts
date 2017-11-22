import { Component, OnInit } from '@angular/core';
import { DishesService } from 'app/dishes/dishes.service';
import { Dish } from 'app/shared/dish.interface';

@Component({
selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
  providers: [ DishesService ]
})
export class DishesComponent implements OnInit {
  dishes: Dish[];
  constructor(private dishesService: DishesService) { }

  ngOnInit() {
    this.getDishes();
  }

  private getDishes() {
    this.dishesService.getDishes().subscribe(
      (dishes) => this.dishes = dishes
    );
  }

  private edit() {
    console.log('TODO: edit');
  }

  private delete() {
    console.log('TODO: delete');
  }
}
