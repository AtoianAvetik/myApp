import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { PasswordCategory } from '../_models/password-category.model';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

interface Passwords {
  [name: string]: PasswordCategory
}

interface PasswordsData {
  categories: {[name: string]: PasswordCategory};
  categoriesArray: {id: string, text: string}[] ;
  categoriesIdArray: string[];
}

@Injectable()
export class DataService {
  private passwordsCategories: Passwords = {};
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
  private passwordActions = {
    'addPassword': this.addPassword.bind(this),
    'editPassword': this.editPassword.bind(this),
    'transferPassword': this.transferPassword.bind(this),
    'deletePassword': this.deletePassword.bind(this),
    'addCategory': this.addPasswordCategory.bind(this),
    'editCategory': this.editPasswordCategory.bind(this),
    'transferCategory': this.transferPasswordCategory.bind(this),
    'deleteCategory': this.deletePasswordCategory.bind(this)
  };
  private _passwords: BehaviorSubject<PasswordsData> = new BehaviorSubject({
    categories: this.passwordsCategories,
    categoriesArray: this.passwordsCategoriesSelectArray,
    categoriesIdArray: this.passwordsCategoriesIdArray
  });
  public readonly passwords: Observable<PasswordsData> = this._passwords.asObservable();

  constructor(private apiService: ApiService) {
    this.loadInitialData();
  }

  get getPasswords() {
    return this.passwords;
  }

  loadInitialData() {
    this.apiService.get('/passwords.json')
      .subscribe(
        res => {
          const resData = (<Passwords>res);
          this.updatePasswordsCategories(resData.categories);
        },
        err => console.error("Error retrieving passwords!")
      );
  }

  getTablesData() {
    return this.tablesData;
  }

  passwordsAction(action: string, option1, option2?, option3?, option4?): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.passwords.subscribe(() => {
        resolve();
      }, (error) => {
        reject(error);
      });

      this.passwordActions[action](option1, option2, option3, option4);

      this.updatePasswordsCategories(this.passwordsCategories);
    });
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
        passwordsCategories[category].editable && newPasswordsCategoriesSelectArray.push({id: categoryId, text: categoryName});
        newPasswordsCategoriesIdArray.push(categoryId);
      }
    }

    this.passwordsCategoriesSelectArray = newPasswordsCategoriesSelectArray;
    this.passwordsCategoriesIdArray = newPasswordsCategoriesIdArray;

    this.updatePasswords();

    function setHierarchicalCategoryName(category) {
      if ( category.parentCategory ) {
        categoryName = passwordsCategories[category.parentCategory].name + '/' + categoryName;
        if ( passwordsCategories[category.parentCategory].parentCategory ) {
          setHierarchicalCategoryName(passwordsCategories[category.parentCategory]);
        }
      }
    }
  }
  updatePasswords() {
    this._passwords.next({
      categories: this.passwordsCategories,
      categoriesArray: this.passwordsCategoriesSelectArray,
      categoriesIdArray: this.passwordsCategoriesIdArray
    });
  }

  removeFromArray(array, item) {
    const index: number = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
