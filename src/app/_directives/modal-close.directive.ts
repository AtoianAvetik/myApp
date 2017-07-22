import {Directive, ElementRef, HostListener} from '@angular/core';

import {ModalService} from '../_services/modal.service';

@Directive({
  selector: '[closeModal]'
})
export class CloseModalDirective {
  private id: string;

  constructor(private modalService: ModalService, private elm: ElementRef) {
    this.id = elm.nativeElement.getAttribute('data-modal');
  }

  @HostListener('click') onClick() {
    this.modalService.modalClosed.emit(this.id);
  }
}
