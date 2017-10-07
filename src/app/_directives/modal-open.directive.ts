import { Directive, HostListener, Input } from '@angular/core';

import { ModalService } from '../_services/modal.service';

@Directive({
  selector: '[openModal]'
})
export class OpenModalDirective {
  @Input('openModal') id: string;

  constructor(private modalService: ModalService) { }

  @HostListener('click') onClick() {
    this.modalService.modalWillOpened.next(this.id);
  }
}
