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

  public createRestaurant(name: string) {
    return this.http.post(this.API_URL, { name: name })
                    .map(this.extractData)
                    .catch(this.errorService.handleError);
  }

  public deleteRestaurant(id: number) {
    // TODO: ver error retornado qando da certo
    return this.http.delete(this.API_URL + id)
                    .map(this.extractData)
                    .catch(this.errorService.handleError);
  }

  private extractData(res: Response) {
    const data = res.json();
    return data;
  }

}
