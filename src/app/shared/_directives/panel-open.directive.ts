import { Directive, HostListener, Input } from '@angular/core';

import { PanelService } from '../_services/panel.service';

@Directive({
  selector: '[openPanel]'
})
export class OpenPanelDirective {
  @Input('openPanel') id: string;

  constructor(private panelService: PanelService) {}

  @HostListener('click') onClick() {
    this.panelService.panelWillOpened.next(this.id);
  }
}