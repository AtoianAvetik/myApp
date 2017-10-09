import {Injectable, Inject} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { PassItem } from '../_models/pass-item.model';
import { PasswordCategory } from '../_models/password-category.model';

@Injectable()
export class DataService {
  private passData: Observable<PassItem[]>;
  private passValues: PassItem[] = [];
  private passwordsData: Observable<any>;
  private passwordsCategories: {[name: string]: PasswordCategory} = {};
  private passwordsCategoriesSelectArray: Array<any> = [];
  private passwordsCategoriesIdArray: Array<any> = [];
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
    this.passwordsData = this.http.get('/assets/data/passwords.json').map(res => res.json() as {[name: string]: {[name: string]: PasswordCategory}});

    const subscriber = this.passData.subscribe(value => {
        value.forEach(element => {
          this.passValues.push(element);
        });
      }
    );
    const subscriber1 = this.passwordsData.subscribe(value => {
      console.log(value);
      this.updatePasswordsCategories(value.categories);
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
    return {
      categories: this.passwordsCategories,
      categoriesArray: this.passwordsCategoriesSelectArray,
      categoriesIdArray: this.passwordsCategoriesIdArray
    }
  }

  addPassword(categoryId, item) {
    this.passwordsCategories[categoryId].content.push(item);
  }
  deletePassword(categoryId, itemIndex) {
    this.passwordsCategories[categoryId].content.splice(itemIndex, 1);
  }
  editPassword(categoryId, itemIndex, item) {
    this.passwordsCategories[categoryId].content[itemIndex] = item;
  }
  transferPassword(prevCategoryId, categoryId, itemIndex, item) {
    this.passwordsCategories[prevCategoryId].content.splice(itemIndex, 1);
    this.passwordsCategories[categoryId].content.push(item);
  }
  addPasswordCategory(category: PasswordCategory) {
    this.passwordsCategories[category.id] = category;

    if ( category.parentCategory ) {
      this.passwordsCategories[category.parentCategory].childCategories.push(category.id);
    }

    this.updatePasswordsCategories(this.passwordsCategories);
  }
  deletePasswordCategory(category, isChild = false) {
    if ( category.parentCategory && !isChild ) {
      this.removeFromArray(this.passwordsCategories[category.parentCategory].childCategories, category.id);
    }
    if ( category.childCategories.length ) {
      category.childCategories.forEach((id) => {
        this.deletePasswordCategory(this.passwordsCategories[id], true)
      });
    }
    delete this.passwordsCategories[category.id];
    this.updatePasswordsCategories( this.passwordsCategories );
  }
  editPasswordCategory(category) {
    this.passwordsCategories[category.id] = category;
  }
  transferPasswordCategory(category, categoryId) {
    const parentCategory = this.passwordsCategories[category.id].parentCategory;
    parentCategory && this.removeFromArray(this.passwordsCategories[parentCategory].childCategories, category.id);
    this.passwordsCategories[category.id].parentCategory = categoryId;
    if ( categoryId ) {
      this.passwordsCategories[categoryId].childCategories.push(category.id);
    }
    this.updatePasswordsCategories(this.passwordsCategories);
  }
  updatePasswordsCategories(passwordsCategories) {
    console.log( passwordsCategories );
    let categoryName;
    this.passwordsCategories = passwordsCategories;
    const newPasswordsCategoriesSelectArray = [];
    const newPasswordsCategoriesIdArray = [];

    for ( const category in passwordsCategories ) {
      if (passwordsCategories.hasOwnProperty(category)) {
        const categoryId = passwordsCategories[category].id;
        categoryName = passwordsCategories[category].name;
        setHierarchicalCategoryName(passwordsCategories[category]);
        (category !== 'none') && newPasswordsCategoriesSelectArray.push({id: categoryId, text: categoryName});
        newPasswordsCategoriesIdArray.push(categoryId);
      }
    }

    this.passwordsCategoriesSelectArray = newPasswordsCategoriesSelectArray;
    this.passwordsCategoriesIdArray = newPasswordsCategoriesIdArray;

    this.passwordsDataChanged.next({
      categories: this.passwordsCategories,
      categoriesArray: this.passwordsCategoriesSelectArray,
      categoriesIdArray: this.passwordsCategoriesIdArray
    });

    function setHierarchicalCategoryName(category) {
      if ( category.parentCategory ) {
        categoryName = passwordsCategories[category.parentCategory].name + '/' + categoryName;
        if ( passwordsCategories[category.parentCategory].parentCategory ) {
          setHierarchicalCategoryName(passwordsCategories[category.parentCategory]);
        }
      }
    }
  }

  removeFromArray(array, item) {
    const index: number = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
