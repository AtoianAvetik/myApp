import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../../_services/data.service';
import { PasswordCategory } from '../../_models/password-category.model';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  @Input() mode: string = 'add';
  @Input() categories: Array<any> = [];
  @Input() categoriesIdArray: Array<any> = [];
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
    this.form['submitted'] = true;
    if (this.form.valid) {
      if ( this.mode === 'add' ) {
        const parentFolder = this.form.get('categorySelect').value ? [this.form.get('categorySelect').value.toString()] : [];
        const categoryName = this.form.get('categoryName').value.toString();
        const id = (parseInt(this.categoriesIdArray[this.categoriesIdArray.length - 1], 10) + 1).toString();

        const category = new PasswordCategory(id, categoryName, [], parentFolder, []);
        this.dataService.addPasswordCategory(category);
      }
    }
  }
}
