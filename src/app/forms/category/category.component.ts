import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../../_services/data.service';
import { PasswordCategory } from '../../_models/password-category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() mode: string = 'add';
  @Input() categories: Array<any> = [];
  private categoryName: string = '';
  private categorySelect: any = null;
  form: FormGroup;

  constructor(private dataService: DataService) { }

  initForm() {
    this.form = new FormGroup({
      'categoryName': new FormControl(this.categoryName, Validators.required),
      'categorySelect': new FormControl(this.categorySelect)
    });
  }

  ngOnInit() {
    // this.initForm();
  }

  onSelectCategory(data) {
    let formControl: FormControl;
    formControl = <FormControl>this.form.get('categorySelect');

    formControl.markAsDirty();
    formControl.setValue([data.id]);
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

  reset() {
    this.form.reset();
  }

  submit() {
    if (this.form.valid) {
      if ( this.mode === 'add' ) {
        const parentFolder = this.form.get('categorySelect').value ? this.form.get('categorySelect').value.toString() : null;
        const categoryName = this.form.get('categoryName').value.toString();

        this.createId(this.categories, 'ct', 1).then((id) => {
          const category = new PasswordCategory(id, categoryName, [], parentFolder, []);
          this.dataService.addPasswordCategory(category);
        });
      }
    }
  }

  createId(array, val, index) {
    let newValue = val + index;

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
