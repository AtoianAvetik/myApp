import { ElementRef } from '@angular/core';

export class Modal {
  public id: string;
  public el: ElementRef;

  constructor(id: string, el: ElementRef) {
    this.id = id;
    this.el = el;
  }
}
