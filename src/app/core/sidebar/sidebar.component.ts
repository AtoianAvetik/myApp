import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { SidebarService } from '../../_services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('sidebar', [
      state('open', style({width: '220px'})),
      state('close', style({width: '65px'})),
      transition('close => open, open => close', animate('0.4s cubic-bezier(0.55, 0, 0.1, 1)'))
    ])
  ]
})
export class SidebarComponent implements OnInit{
  isExpand;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
    this.isExpand = this.sidebarService.isExpand;
    this.sidebarService.toogleSidebarChange
      .subscribe(
        (status) => {
          this.isExpand = status;
        }
      );
  }

  toggleSidebar() {
    this.sidebarService.toogleSidebarChange.next(!this.isExpand);
  }
}
