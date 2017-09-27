import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ValidatorsService } from '../../_services/validators.service';
import { DataService } from '../../_services/data.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit, OnChanges {
  @Input() mode: string = 'add';
  @Input() itemIndex: number = null;
  @Input() categoryId: any = null;
  @Input() categories: any = [];
  @Input() categoriesData: any = {};
  private formDefaultValues = {
    serviceName: '',
    url: '',
    userName: '',
    email: '',
    pass: '',
    desc: '',
    categorySelect: null,
    previewImage: {
      image: '',
      imageUrl: null,
      uploadImage: null,
      chooseImage: null,
    },
    additionalOptions: {}
  };
  private activeCategory: any = [];
  previewImage = null;
  private isTransfer = false;
  form: FormGroup = null;

  constructor(private validatorsService: ValidatorsService,
              private dataService: DataService) { }

  initForm() {
    this.form = new FormGroup({
      'serviceName': new FormControl(this.formDefaultValues.serviceName, Validators.required),
      'url': new FormControl(this.formDefaultValues.url, [Validators.required, this.validatorsService.url.bind(this.validatorsService)]),
      'userName': new FormControl(this.formDefaultValues.userName, Validators.required),
      'email': new FormControl(this.formDefaultValues.email, [Validators.required, this.validatorsService.email.bind(this.validatorsService)]),
      'pass': new FormControl(this.formDefaultValues.pass, Validators.required),
      'desc': new FormControl(this.formDefaultValues.desc),
      'categorySelect': new FormControl(this.formDefaultValues.categorySelect, Validators.required),
      'previewImage': new FormGroup({
        'image': new FormControl(this.formDefaultValues.previewImage.image),
        'imageUrl': new FormControl(this.formDefaultValues.previewImage.imageUrl, this.validatorsService.image.bind(this.validatorsService)),
        'uploadImage': new FormControl(this.formDefaultValues.previewImage.uploadImage),
        'chooseImage': new FormControl(this.formDefaultValues.previewImage.chooseImage)
      }),
      'additionalOptions': new FormGroup({})
    });
  }

  updateForm() {
    if ( !Object.getOwnPropertyNames(this.categoriesData).length ) {
      return false;
    }

    let updatedValues = JSON.parse(JSON.stringify(this.formDefaultValues));


    if ( this.mode === 'edit') {
      this.activeCategory = [this.categories[this.categoryId - 1]];

      const password = this.categoriesData[this.categoryId].content[this.itemIndex];
      updatedValues.serviceName = password.serviceName;
      updatedValues.url = password.url;
      updatedValues.userName = password.userName;
      updatedValues.email = password.email;
      updatedValues.pass = password.pass;
      updatedValues.desc = password.desc;
      updatedValues.categorySelect = this.activeCategory;
      updatedValues.previewImage.image = password.img;
    }

    this.form.setValue(updatedValues);

    console.log( this.mode );
    console.log( this.form.value );
  }


  ngOnInit() {
    // this.initForm();
  }

  ngOnChanges() {
    this.updateForm();
  }

  uploadImage(data) {
    console.log( data );
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
    formControl.setValue([data.id]);
  }

  selectPreviewImage(image) {
    this.get('previewImage.imageUrl').setValue(image);
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
    this.activeCategory = [];
    this.previewImage = '';
    this.isTransfer = false;

    this.form.reset();
  }

  submit() {
    if (this.form.valid) {
      const newPassword = {
        serviceName: this.form.get('serviceName').value,
        url: this.form.get('url').value,
        userName: this.form.get('userName').value,
        email: this.form.get('email').value,
        pass: this.form.get('pass').value,
        desc: this.form.get('desc').value,
        img: this.form.get('previewImage.image').value
      };

      if ( this.mode === 'add' ) {
        this.dataService.addPassword(this.form.get('categorySelect').value, newPassword);
      }
      if ( this.mode === 'edit' ) {
        if ( this.isTransfer ) {
          this.dataService.transferPassword(this.categoryId, this.form.get('categorySelect').value, this.itemIndex, newPassword);
        } else {
          this.dataService.editPassword(this.categoryId, this.itemIndex, newPassword);
        }
      }
    }
  }
}
