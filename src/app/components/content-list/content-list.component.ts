import {Component, HostBinding, Input, OnInit} from '@angular/core';

import {ContentListService} from "../../_services/content-list.service";

@Component({
  selector: 'app-content-list',
  template: `
    <div class="page-list">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
