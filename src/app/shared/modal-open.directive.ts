import {Directive, ElementRef, HostListener, ViewChild} from '@angular/core';

import {ModalService} from '../_services/modal.service';

@Directive({
  selector: '[openModal]'
})
export class openModalDirective {
  private id: string;

  constructor(private modalService: ModalService, private elm: ElementRef) {
    this.id = elm.nativeElement.getAttribute('data-modal');
  }

  @HostListener('click') onClick() {
    this.modalService.modalOpened.emit(this.id);
  }
}
