import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ErrorService } from '../shared/error.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Restaurant } from '../shared/restaurant.interface';

@Injectable()
export class RestaurantsService {
  private API_URL = 'http://localhost:5000/api/restaurants/';

  constructor(private http: Http,
              private errorService: ErrorService) { }

  public getRestaurants(): Observable<Restaurant[]> {
    return this.http.get(this.API_URL)
                    .map(this.extractData)
                    .catch(this.errorService.handleError);
  }

  public getRestaurant(name: string) {

  }

  private extractData(res: Response) {
    const data = res.json();
    console.log(data);
    return data;
  }

}
