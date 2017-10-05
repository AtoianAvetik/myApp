import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { AppService } from './_services/app.service';
import { SidebarService } from './_services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('sidebar', [
      state('open', style({paddingLeft: '220px'})),
      state('close', style({paddingLeft: '65px'})),
      transition('close => open, open => close', animate('0.4s cubic-bezier(0.55, 0, 0.1, 1)'))
    ])
  ]
})
export class AppComponent implements OnInit {
  isSidebarExpand;

  constructor(private appService: AppService,
              private sidebarService: SidebarService) {}

  ngOnInit() {
    this.isSidebarExpand = this.sidebarService.isExpand;
    this.sidebarService.toogleSidebarChange
      .subscribe(
        (status) => {
          this.isSidebarExpand = status;
        }
      )
  }

  onWrapClick() {
    this.appService.appWrapClicked.next();
  }
}
