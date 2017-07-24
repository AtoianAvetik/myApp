import {Component, Input, OnInit} from '@angular/core';

import {ContentListService} from "../../_services/content-list.service";

@Component({
  selector: 'app-content-list',
  template: '<ng-content></ng-content>',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
