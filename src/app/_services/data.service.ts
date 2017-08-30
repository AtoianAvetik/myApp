import {Injectable, Inject} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { PassItem } from '../_models/pass-item.model';

@Injectable()
export class DataService {
  private passData: Observable<PassItem[]>;
  private passValues: PassItem[] = [];
  private passwordsData: Observable<any>;
  private passwordsValues: {categories,categoriesIdArray} = {categories: {},categoriesIdArray: []};
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
  passwordsDataChanged = new Subject<any>();

  constructor(@Inject(Http) private http: Http) {
    this.passData = this.http.get('/assets/data/data.json').map(res => res.json() as PassItem[]);
    this.passwordsData = this.http.get('/assets/data/passwords.json').map(res => res.json());

    const subscriber = this.passData.subscribe(value => {
        value.forEach(element => {
          this.passValues.push(element);
        });
      }
    );
    const subscriber1 = this.passwordsData.subscribe(value => {
        this.passwordsValues = value;
        this.passwordsDataChanged.next(this.passwordsValues);
      }
    );

  }

  getPassItems() {
    return this.passValues;
  }

  getTablesData() {
    return this.tablesData;
  }

  getPasswordsData() {
    return this.passwordsValues;
  }

  addPassword(categoryId, item) {
    this.passwordsValues.categories[categoryId].content.push(item);
    this.passwordsDataChanged.next(this.passwordsValues);
  }

  deletePassword(categoryId, itemIndex) {
    this.passwordsValues.categories[categoryId].content.splice(itemIndex, 1);
    this.passwordsDataChanged.next(this.passwordsValues);
  }

  editPassword(categoryId, itemIndex, item) {
    this.passwordsValues.categories[categoryId].content[itemIndex] = item;
    this.passwordsDataChanged.next(this.passwordsValues);
  }

  addPasswordCategory(category) {
    this.passwordsValues.categoriesIdArray.push(category.id);
    this.passwordsValues.categories[category.id] = category;
    this.passwordsDataChanged.next(this.passwordsValues);
  }

}
