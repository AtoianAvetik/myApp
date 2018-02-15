import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService } from '../../components/loader/loader.service';
import { GetLogoService } from '../../shared/_services/get-logo.service';

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.scss']
})
export class SearchImageComponent implements OnInit, OnDestroy {
  form: FormGroup = null;
  images = [];
  getImagesLoader;
  getLogoSubscription: Subscription;

  constructor(private loaderService: LoaderService,
              private getLogo: GetLogoService) { }

  ngOnInit() {
    this.getLogoSubscription = this.getLogo.loaded
      .subscribe(
        (data: any) => {
          if ( data instanceof Array ) {
            for (let i = 0; i < data.length; i++) {
              this.images.push(data[i].url);
              if (i === data.length - 1) {
                this.getImagesLoader.dismiss();
              }
            }
          }
        },
        (error: any) => {
          console.error(error);
          this.getImagesLoader.dismiss();
        }
      );
  }

  ngOnDestroy() {
    this.getLogoSubscription.unsubscribe();
  }

  initForm() {
    this.form = new FormGroup({
      'searchTerm': new FormControl(null),
      'image': new FormControl(null, Validators.required)
    });
  }

  selectImage(image) {
    this.form.get('image').setValue(image);
  }

  updateImagesArray() {
    this.images = [];
    this.getImagesLoader = this.loaderService.create({
      id: 'getImages'
    });

    const sub = this.getImagesLoader.present().subscribe(
      () => {
        this.getLogo.getSiteLogoArray(this.form.get('searchTerm').value, 10);
        sub.unsubscribe();
      }
    );
  }

  isValid(ctrl?: string) {
    return ctrl ? this.get(ctrl).valid : this.form.valid;
  }

  get(ctrl: string) {
    return this.form.get(ctrl);
  }

  resetForm() {
    this.images = [];

    this.form.reset();
  }

  getSelectedImage() {
    return this.form.get('image').value;
  }

  onSubmit() {
    if (this.form.get('searchTerm').value) {
      this.updateImagesArray();
    }
  }
}
