import { Injectable } from '@angular/core';
import { ErrorService } from '../shared/error.service';
import { Http, Response } from '@angular/http';
import { Dish } from 'app/shared/dish.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DishesService {
  private API_URL = 'http://localhost:5000/api/dishes/';

  constructor(private http: Http,
              private errorService: ErrorService) { }

  public getDishes(): Observable<Dish[]> {
    return this.http.get(this.API_URL)
                    .map(this.extractData)
                    .catch(this.errorService.handleError);
  }

  public createDish(dish: Dish): Observable<void> {
    const body = {
      name: dish.dishName,
      price: dish.dishPrice,
      restaurantID: dish.restID
    };
    return this.http.post(this.API_URL, body)
                    .map(this.extractData)
                    .catch(this.errorService.handleError);
  }

  public deleteDish(id: number) {
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
}
