import { Component, ViewEncapsulation } from '@angular/core';

import { AppService } from '../../_services/app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {
  isExpand = true;

  constructor(private appService: AppService) { }

  toggleSidebar() {
    this.isExpand = !this.isExpand;
    this.appService.toogleSidebarChange.next(this.isExpand);
  }
}
