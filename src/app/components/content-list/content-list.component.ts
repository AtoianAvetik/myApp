import {Component, HostBinding, Input, OnInit} from '@angular/core';

import {ContentListService} from "../../_services/content-list.service";

@Component({
  selector: '[content-list]',
  template: `    
      <ng-content></ng-content>
  `,
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {
  @HostBinding('attr.class') listClass = 'page-list';

  constructor() { }

  ngOnInit() { }
}
