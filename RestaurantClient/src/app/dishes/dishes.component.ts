import { Component, OnInit } from '@angular/core';
import { DishesService } from 'app/dishes/dishes.service';
import { Dish } from 'app/shared/dish.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishes: Dish[];
  constructor(private dishesService: DishesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getDishes();
  }

  private getDishes() {
    this.dishesService.getDishes().subscribe(
      (dishes) => this.dishes = dishes
    );
  }

  private create() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  private edit() {
    console.log('TODO: edit');
  }

  private onDishDeleted() {
    this.getDishes();
  }
}
