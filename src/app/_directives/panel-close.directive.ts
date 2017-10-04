import { Directive, ElementRef, HostListener } from '@angular/core';

import { PanelService } from '../_services/panel.service';

@Directive({
  selector: '[closePanel]'
})
export class ClosePanelDirective {
  private id: string;

  constructor(private panelService: PanelService, private elm: ElementRef) {
    this.id = elm.nativeElement.getAttribute('data-panel');
  }

  @HostListener('click') onClick() {
    this.panelService.panelWillClosed.next(this.id);
  }
}
