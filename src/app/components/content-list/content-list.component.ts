import { Component, HostBinding } from '@angular/core';

@Component({
  selector: '[content-list]',
  template: `    
      <ng-content></ng-content>
  `,
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent {
  @HostBinding('attr.class') listClass = 'page-list';

  constructor() { }
}
