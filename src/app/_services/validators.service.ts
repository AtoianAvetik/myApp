import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class ValidatorsService {
  private regexes = {
    url: /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/,
    imageUrl: /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/,
    email: /^[\w\d.+]+@[\w\d]+(?:\.[a-z]{2,4}){1,2}$/
  };

  regExpValidator(regExp: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      return !control.value.match(regExp) ? {'invalidValue': {value: control.value}} : null;
    };
  }

  url(control: AbstractControl): {[key: string]: any} {
    return control.value ? this.regExpValidator(new RegExp(this.regexes.url, 'i'))(control) : null;
  }

  email(control: AbstractControl): {[key: string]: any} {
    return control.value ? this.regExpValidator(new RegExp(this.regexes.email, 'i'))(control) : null;
  }

  image(control: AbstractControl): {[key: string]: any} {
    return control.value ? this.regExpValidator(new RegExp(this.regexes.imageUrl, 'i'))(control) : null;
  }
}
