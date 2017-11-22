import { Injectable } from '@angular/core';
import { ErrorService } from '../shared/error.service';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DishesService {
  private API_URL = 'http://localhost:5000/api/dishes/';

  constructor(private http: Http,
              private errorService: ErrorService) { }

  public getDishes() {
    return this.http.get(this.API_URL)
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
}
