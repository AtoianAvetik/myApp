import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-accordion',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./accordion.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AccordionComponent {
  @HostBinding('attr.class') class = 'panel-group';
}
