import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AppService } from '../../_services/app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit{
  isExpand = true;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.toogleSidebarChange
      .subscribe(
        (status) => {
          this.isExpand = status;
        }
      )
  }

  toggleSidebar() {
    this.isExpand = !this.isExpand;
    this.appService.toogleSidebarChange.next(this.isExpand);
  }
}
