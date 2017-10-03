import { Directive, ElementRef, HostListener } from '@angular/core';

import { PanelService } from '../_services/panel.service';

@Directive({
  selector: '[openPanel]'
})
export class OpenPanelDirective {
  private id: string;

  constructor(private panelService: PanelService, private elm: ElementRef) {
    this.id = elm.nativeElement.getAttribute('data-panel');
  }

  @HostListener('click') onClick() {
    this.panelService.panelOpened.next(this.id);
  }
}
