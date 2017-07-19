import {Injectable, Inject} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';

import { PassItem } from '../_models/pass-item.model';

@Injectable()
export class DataService {
  private passData: Observable<PassItem[]>;
  private passValues: PassItem[] = [];

  constructor(@Inject(Http) private http: Http) {
    this.passData = this.http.get('/assets/data/data.json').map(res => res.json() as PassItem[]);

    const subscription = this.passData.subscribe(value => {
        value.forEach(element => {
          this.passValues.push(element);
        });
      }
    );
  }

  getPassItems() {
    return this.passValues;
  }

}
