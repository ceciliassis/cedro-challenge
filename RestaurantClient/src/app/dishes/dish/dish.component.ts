import { Component, OnInit, Input, LOCALE_ID } from '@angular/core';
import { Dish } from 'app/shared/dish.interface';

@Component({
  // tslint:disable-next-line:component-selector
selector: '[app-dish]',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css'],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}]
})
export class DishComponent implements OnInit {
  @Input() dish: Dish;

  constructor() { }

  ngOnInit() {
  }

}
