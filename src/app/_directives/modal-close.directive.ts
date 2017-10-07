import { Directive, HostListener, Input } from '@angular/core';

import { ModalService } from '../_services/modal.service';

@Directive({
  selector: '[closeModal]'
})
export class CloseModalDirective {
  @Input('closeModal') id: string;

  constructor(private modalService: ModalService) {}

  @HostListener('click') onClick() {
    this.modalService.modalWillClosed.next(this.id);
  }
}
