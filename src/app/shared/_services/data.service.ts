import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { SmartFolderModel } from '../../components/smart-folders/smart-folder.model';

import { ApiService } from './api.service';

interface Passwords {
  [name: string]: SmartFolderModel
}

interface PasswordsData {
  categories: {[name: string]: SmartFolderModel};
  categoriesSelectArray: {id: string, text: string}[] ;
  categoriesIdArray: string[];
}

@Injectable()
export class DataService {
  private actions = {
    'addItem': this.addItem.bind(this),
    'editItem': this.editItem.bind(this),
    'transferItem': this.transferItem.bind(this),
    'deleteItem': this.deleteItem.bind(this),
    'addCategory': this.addCategory.bind(this),
    'editCategory': this.editCategory.bind(this),
    'transferCategory': this.transferCategory.bind(this),
    'deleteCategory': this.deleteCategory.bind(this)
  };
  private passwordsData: PasswordsData = {
    categories: {},
    categoriesSelectArray: [],
    categoriesIdArray: [],
  };
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
  private _passwords: BehaviorSubject<PasswordsData> = new BehaviorSubject({
    categories: this.passwordsData.categories,
    categoriesSelectArray: this.passwordsData.categoriesSelectArray,
    categoriesIdArray: this.passwordsData.categoriesIdArray
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
          this.updatePasswords(resData.categories);
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

      this.actions[action](this.passwordsData.categories, option1, option2, option3, option4);
      this.updatePasswords(this.passwordsData.categories);
    });
  }

  private updatePasswords(categories) {
    this.passwordsData = this.updateCategories(categories);
    this._passwords.next(this.passwordsData);
  }

  // common actions
  private addItem(categories, categoryId, item) {
    categories[categoryId].content.push(item);
  }
  private editItem(categories, categoryId, itemIndex, item) {
    categories[categoryId].content[itemIndex] = item;
  }
  private transferItem(categories, prevCategoryId, categoryId, itemIndex, item) {
    categories[prevCategoryId].content.splice(itemIndex, 1);
    categories[categoryId].content.push(item);
  }
  private deleteItem(categories, categoryId, itemIndex) {
    categories[categoryId].content.splice(itemIndex, 1);
  }
  private addCategory(categories, category: SmartFolderModel) {
    categories[category.id] = category;
      if ( category.parentFolder ) {
        categories[category.parentFolder].childFolders.push(category.id);
      }
  }
  private deleteCategory(categories, category, isChild = false) {
    if ( category.parentFolder && !isChild ) {
      this.removeFromArray(categories[category.parentFolder].childFolders, category.id);
    }
    if ( category.childFolders.length ) {
      category.childFolders.forEach((id) => {
        this.deleteCategory(categories, categories[id], true)
      });
    }
    delete categories[category.id];
  }
  private editCategory(categories, category) {
    categories[category.id] = category;
  }
  private transferCategory(categories, category, categoryId) {
    const parentFolder = categories[category.id].parentFolder;
    parentFolder && this.removeFromArray(categories[parentFolder].childFolders, category.id);
    categories[category.id].parentFolder = categoryId;
    if ( categoryId ) {
      categories[categoryId].childFolders.push(category.id);
    }
  }
  private updateCategories(categories) {
    let categoryName;
    const categoriesSelectArray = [];
    const categoriesIdArray = [];

    for ( const category in categories ) {
      if (categories.hasOwnProperty(category)) {
        const curCategory = categories[category];
        const categoryId = curCategory.id;
        categoryName = curCategory.name;
        setHierarchicalCategoryName(curCategory);
        curCategory.editable && categoriesSelectArray.push({id: categoryId, text: categoryName});
        categoriesIdArray.push(categoryId);
      }
    }

    return {
      categories: categories,
      categoriesSelectArray: categoriesSelectArray,
      categoriesIdArray: categoriesIdArray
    };

    function setHierarchicalCategoryName(category) {
      if ( category.parentFolder ) {
        categoryName = categories[category.parentFolder].name + '/' + categoryName;
        if ( categories[category.parentFolder].parentFolder ) {
          setHierarchicalCategoryName(categories[category.parentFolder]);
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
