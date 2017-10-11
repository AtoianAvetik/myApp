import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../../_services/data.service';
import { PasswordCategory } from '../../_models/password-category.model';
import { Observable } from 'rxjs/Observable';
import { observable } from 'rxjs/symbol/observable';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnChanges {
  @Input() mode: string = 'add';
  @Input() categoryId: any = null;
  @Input() categoriesData: any = {};
  @Input() categories: Array<any> = [];
  private isTransfer = false;
  private formDefaultValues = {
    categoryName: '',
    categorySelect: null
  };
  curCategoriesList: Array<any> = [];
  activeCategory: any = [];
  form: FormGroup;

  constructor(private dataService: DataService) { }

  initForm() {
    this.form = new FormGroup({
      'categoryName': new FormControl(this.formDefaultValues.categoryName, Validators.required),
      'categorySelect': new FormControl(this.formDefaultValues.categorySelect)
    });
  }

  updateForm() {
    if ( !Object.getOwnPropertyNames(this.categoriesData).length ) {
      return false;
    }
    this.form.reset();
    this.curCategoriesList = this.categories.slice();

    const updatedValues = JSON.parse(JSON.stringify(this.formDefaultValues));

    if ( this.mode === 'edit' && this.categoriesData[this.categoryId]) {
      this.curCategoriesList = this.categories.filter((category) => {
        if ( category.id === this.categoryId || this.categoriesData[this.categoryId].parentCategory === category.id) {
          return false;
        } else if ( this.categoriesData[category.id].parentCategory ) {
          return  checkParent(this.categoriesData, this.categoryId, category.id );
        } else {
          return true;
        }
      });

      const parentCategory = this.categoriesData[this.categoryId].parentCategory;
      this.activeCategory = parentCategory ? [this.categories.find((el, index) => el.id === parentCategory)] : null;

      const category = this.categoriesData[this.categoryId];
      updatedValues.categoryName = category.name;
      updatedValues.categorySelect = this.activeCategory;
    }

    this.form.setValue(updatedValues);

    function checkParent(data, selectedId, curId ) {
      if ( data[curId].parentCategory === selectedId ) {
        return false;
      } else {
        if ( data[data[curId].parentCategory].parentCategory ) {
          return checkParent(data, selectedId, data[curId].parentCategory);
        } else {
          return true;
        }
      }
    }
  }

  ngOnInit() {
    // this.initForm();
  }

  ngOnChanges() {
    this.updateForm();
  }

  onSelectCategory(data) {
    let formControl: FormControl;
    formControl = <FormControl>this.form.get('categorySelect');

    if ( this.mode === 'edit' ) {
      this.isTransfer = true;
    }
    if ( data.id === this.categoryId ) {
      this.isTransfer = false;
    }

    formControl.markAsDirty();
    formControl.setValue(data);
  }

  isValid(ctrl?: string) {
    return ctrl ? this.get(ctrl).valid : this.form.valid;
  }

  isDirty(ctrl?: string) {
    return ctrl ? this.get(ctrl).dirty : this.form.dirty;
  }

  get(ctrl: string) {
    return this.form.get(ctrl);
  }

  resetForm() {
    this.activeCategory = [];
    this.isTransfer = false;
    this.curCategoriesList = [];

    this.form.reset();
    this.updateForm();
  }


  onSubmit() {
    return new Observable(observer => {
      if (this.form.valid) {
        const parentFolder = this.form.get('categorySelect').value ? this.form.get('categorySelect').value.id : null;
        const categoryName = this.form.get('categoryName').value.toString();
        if ( this.mode === 'add' ) {
          const category = new PasswordCategory('', categoryName, parentFolder);
          this.createId(this.categories, 'ct', 1).then((id) => {
            category.id = id;
            this.dataService.passwordsAction('addCategory', category).subscribe(() => {observer.next()});
          });
        }
        if ( this.mode === 'edit' ) {
          const category = this.categoriesData[this.categoryId];
          category.name = categoryName;
          if ( this.isTransfer ) {
            this.dataService.transferPasswordCategory(category, parentFolder);
          } else {
            this.dataService.editPasswordCategory(category);
          }
        }
      }
    });
  }

  createId(array, val, index) {
    const newValue = val + index;

    const found = array.some(function (el) {
      return el.id === newValue;
    });

    if ( found ) {
      return this.createId(array, val, index + 1);
    } else {
      return new Promise((resolve) => {
        resolve(newValue);
      });
    }
  }
}
