import { Component, HostBinding } from '@angular/core';

@Component({
  selector: '[smart-list]',
  template: `    
      <ng-content></ng-content>
  `,
  styleUrls: ['./smart-list.component.scss']
})
export class SmartListComponent {
  @HostBinding('attr.class') listClass = 'smart-list';

  constructor() { }
}
