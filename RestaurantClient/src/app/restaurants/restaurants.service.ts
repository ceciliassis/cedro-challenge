import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import { ErrorService } from '../shared/error.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Restaurant } from '../shared/restaurant.interface';

@Injectable()
export class RestaurantsService {
  private API_URL = 'http://localhost:5000/api/restaurants/';
  private restaurant: Restaurant;

  constructor(private http: Http,
              private errorService: ErrorService) {
    this.resetRestaurant();
  }

  public getRestaurants(): Observable<Restaurant[]> {
    return this.http.get(this.API_URL)
                    .map(this.extractData)
                    .catch(this.errorService.handleError);
  }

  public getRestaurant(name: string): Observable<Restaurant> {
    const params = new URLSearchParams();
    params.set('name', name);
    return this.http.get(this.API_URL + 'search', { params })
                    .map(this.extractData)
                    .catch(this.errorService.handleError);
  }

  public createRestaurant(name: string): Observable<void> {
    return this.http.post(this.API_URL, { name: name })
                    .map(this.extractData)
                    .catch(this.errorService.handleError);
  }

  public editRestaurant(rest: Restaurant): Observable<void> {
    const body = {
      restaurantID: rest.restaurantID,
      name: rest.name
    };
    return this.http.patch(this.API_URL + rest.restaurantID, body)
                    .map(this.extractData)
                    .catch(this.errorService.handleError);
  }

  public deleteRestaurant(id: number): Observable<void> {
    return this.http.delete(this.API_URL + id)
                    .map(this.extractData)
                    .catch(this.errorService.handleError);
  }

  private extractData(res: Response) {
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

  public storeRestaurant(res: Restaurant) {
    this.restaurant = res;
  }

  public getStoredRestaurant(): Restaurant {
    return this.restaurant;
  }

  private resetRestaurant() {
    this.restaurant = {
      restaurantID: null,
      dishes: null,
      name: '' };
  }

}
