import {Injectable, Inject} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';

import { PassItem } from '../_models/pass-item.model';

@Injectable()
export class DataService {
  private passData: Observable<PassItem[]>;
  private passValues: PassItem[] = [];
  private tablesData = [
    {
      id: 'table1',
      title: 'Table 1',
      headers: {
        col1: 'Column 1',
        col2: 'Column 2',
        col3: 'Column 3',
        col4: 'Column 4'
      },
      content: [
        {
          col1: 'Cell 1',
          col2: 'Cell 2',
          col3: 'Cell 3',
          col4: 'Cell 4',
        },
        {
          col1: 'Cell 5',
          col2: 'Cell 6',
          col3: 'Cell 7',
          col4: 'Cell 8',
        }
      ]
    },
    {
      id: 'table2',
      title: 'Table 2',
      headers: {
        col1: 'Column 1',
        col2: 'Column 2',
        col3: 'Column 3',
        col4: 'Column 4'
      },
      content: [
        {
          col1: 'Cell 9',
          col2: 'Cell 10',
          col3: 'Cell 11',
          col4: 'Cell 12',
        },
        {
          col1: 'Cell 13',
          col2: 'Cell 14',
          col3: 'Cell 15',
          col4: 'Cell 16',
        }
      ]
    }
  ];

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

  getTablesData() {
    return this.tablesData;
  }

}
