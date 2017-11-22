import { Component, Input, LOCALE_ID, Output, EventEmitter } from '@angular/core';
import { Dish } from 'app/shared/dish.interface';
import { DishesService } from 'app/dishes/dishes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
selector: '[app-dish]',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css'],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}]
})
export class DishComponent {
  @Input() dish: Dish;
  @Output() dishDeleted = new EventEmitter<void>();

  constructor(private dishesService: DishesService,
              private router: Router,
              private route: ActivatedRoute) { }

  private edit() {
    this.dishesService.storeDish(this.dish);
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  private delete() {
    this.dishesService.deleteDish(this.dish.dishID)
                      .subscribe(
                        () => this.dishDeleted.emit()
                      );
  }

}
