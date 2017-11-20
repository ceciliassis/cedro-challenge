import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class ErrorService {

  constructor() { }

  public handleError(error: Response | any) {
    let errorMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err  = body.error || JSON.stringify(body);
      errorMsg = `${error.status} - ${error.statusText || ''} ${err}`
    } else {
      errorMsg = error.message ? error.message : error.toString();
    }

    console.error(errorMsg);
    return Observable.throw(errorMsg);
  }

}
