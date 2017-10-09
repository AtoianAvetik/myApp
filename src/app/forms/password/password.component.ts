import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ValidatorsService } from '../../_services/validators.service';
import { DataService } from '../../_services/data.service';
import { ImgToBase64Service } from '../../_services/img-to-base64.service';
import { LoaderService } from '../../_services/loader.service';
import { PasswordCategory } from '../../_models/password-category.model';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [ImgToBase64Service]
})
export class PasswordComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() mode: string = 'add';
  @Input() itemIndex: number = null;
  @Input() categoryId: any = null;
  @Input() categories: any = [];
  @Input() categoriesData: any = {};
  form: FormGroup = null;
  private isTransfer = false;
  private formDefaultValues = {
    serviceName: '',
    url: '',
    userName: '',
    email: '',
    pass: '',
    desc: '',
    categorySelect: {id: 'none', text: '(none)'},
    previewImage: {
      image: '',
      lastImage: '',
      uploadImage: null,
    }
  };
  activeCategory: any = [];
  previewImageLoader;
  passwordFormLoader;

  constructor(private validatorsService: ValidatorsService,
              private dataService: DataService,
              private loaderService: LoaderService,
              private imgToBase64: ImgToBase64Service) { }

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
        'lastImage': new FormControl(this.formDefaultValues.previewImage.lastImage),
        'uploadImage': new FormControl(this.formDefaultValues.previewImage.uploadImage),
      })
    });
  }

  updateForm() {
    if ( !Object.getOwnPropertyNames(this.categoriesData).length ) {
      return false;
    }

    const updatedValues = JSON.parse(JSON.stringify(this.formDefaultValues));

    if ( this.mode === 'edit' && this.categoriesData[this.categoryId] && this.categoriesData[this.categoryId].content[this.itemIndex] ) {
      this.categoriesData[this.categoryId].editable && (this.activeCategory = [this.categories.find((el, index) => el.id === this.categoryId)])

      const password = this.categoriesData[this.categoryId].content[this.itemIndex];
      updatedValues.serviceName = password.serviceName;
      updatedValues.url = password.url;
      updatedValues.userName = password.userName;
      updatedValues.email = password.email;
      updatedValues.pass = password.pass;
      updatedValues.desc = password.desc;
      updatedValues.categorySelect = this.activeCategory;
      updatedValues.previewImage.image = password.img;
      updatedValues.previewImage.lastImage = password.img;
    }

    this.form.setValue(updatedValues);
  }


  ngOnInit() {
    // this.initForm();
    this.imgToBase64.converted
      .subscribe(
        (image: string) => {
          this.previewImageLoader.dismiss();
          this.setPreviewImage(image);
        }
      );
  }

  ngAfterViewInit() {
    this.previewImageLoader = this.loaderService.create({
      id: 'previewImage'
    });
    this.passwordFormLoader = this.loaderService.create({
      id: 'passwordForm'
    });
  }

  ngOnChanges() {
    this.updateForm();
  }

  uploadImage(image) {
    const subImage = this.previewImageLoader.present().subscribe(
      () => {
        this.imgToBase64.convert(image);
        subImage.unsubscribe();
      }
    );
  }

  setPreviewImage(image) {
    let formControl: FormControl;
    formControl = <FormControl>this.form.get('previewImage.image');

    formControl.setValue(image);
    formControl.markAsTouched();
    formControl.markAsDirty();
  }

  revertImage(e) {
    e.stopPropagation();
    let imageFormControl: FormControl;
    let uploadFormControl: FormControl;
    imageFormControl = <FormControl>this.form.get('previewImage.image');
    uploadFormControl = <FormControl>this.form.get('previewImage.uploadImage');

    imageFormControl.setValue(this.form.get('previewImage.lastImage').value);
    uploadFormControl.setValue(this.formDefaultValues.previewImage.uploadImage);
    imageFormControl.markAsUntouched();
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

  reset() {
    this.activeCategory = [];
    this.isTransfer = false;
    this.mode = '';

    this.form.reset();
    this.updateForm();
  }

  submit() {
    if (this.form.valid) {
      const parentCategoryId = this.form.get('categorySelect').value.id;
      const parentCategoryName = this.form.get('categorySelect').value.text;
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
        if (!this.categoriesData[parentCategoryId]) {
          const category = new PasswordCategory(parentCategoryId, parentCategoryName);
          this.dataService.addPasswordCategory(category);
        }
        this.dataService.addPassword(parentCategoryId, newPassword);
      }
      if ( this.mode === 'edit' ) {
        if ( this.isTransfer ) {
          this.dataService.transferPassword(this.categoryId, parentCategoryId, this.itemIndex, newPassword);
        } else {
          this.dataService.editPassword(this.categoryId, this.itemIndex, newPassword);
        }
      }
    }
  }
}
