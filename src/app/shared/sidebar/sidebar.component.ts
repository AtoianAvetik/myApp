import { AfterViewInit, Component, ElementRef, OnChanges, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { ROUTES } from './sidebar-routes.config';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    animations: [
      trigger('slide', [
        state('down' , style({ height: '*', display: 'block' })),
        state('up', style({ height: 0, display: 'none' })),
        state('firstLoad', style({ height: 0, display: 'none' })),
        transition('up => down', animate('300ms')),
        transition('down => up', animate('300ms'))
      ])
    ]
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    isCollapsed = true;
    el: ElementRef;

    constructor(el: ElementRef) {
      this.el = el;
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
