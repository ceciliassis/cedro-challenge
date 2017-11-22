import { Injectable } from '@angular/core';
import { ErrorService } from '../shared/error.service';
import { Http, Response } from '@angular/http';
import { Dish } from './dish.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DishesService {
  private API_URL = 'http://localhost:5000/api/dishes/';
  private dish: Dish;

  constructor(private http: Http,
              private errorService: ErrorService) {
    this.resetDish();
  }

  public getDishes(): Observable<Dish[]> {
    return this.http.get(this.API_URL)
                    .map(this.extractData)
                    .catch(this.errorService.handleError);
  }

  public createDish(dish: Dish): Observable<void> {
    const body = {
      name: dish.name,
      price: dish.price,
      restaurantID: dish.restaurantID
    };
    return this.http.post(this.API_URL, body)
                    .map(this.extractData)
                    .catch(this.errorService.handleError);
  }

  public editDish(dish: Dish): Observable<void> {
    const body = {
      dishID: this.dish.dishID,
      name: dish.name,
      price: dish.price,
      restaurantID: dish.restaurantID
    };

    return this.http.patch(this.API_URL + this.dish.dishID, body)
                    .map(this.extractData)
                    .catch(this.errorService.handleError);
  }

  public deleteDish(id: number): Observable<void> {
    return this.http.delete(this.API_URL + id)
                    .map(this.extractData)
                    .catch(this.errorService.handleError);
  }

  private extractData(res: Response): any {
    let data;
    if (res.ok) {
      try {
        data = res.json();
      }catch (ex) {
        data = {}
      }
    }
    return data;
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

  public storeDish(dish: Dish): void {
    this.dish = dish;
  }

  public getStoredDish(): Dish {
    return this.dish;
  }
}
