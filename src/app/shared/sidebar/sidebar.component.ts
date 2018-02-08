import {
	AfterViewInit,
	Component, EventEmitter, HostListener, Input, OnInit,
	Output
} from '@angular/core';
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
	@HostListener('mouseenter') onMouseenter() {
		if ( !this.isNavExpand ) {
			this.isMenuExpandChange.emit(true);
		}
	}
	@HostListener('mouseleave') onMouseleave() {
		if ( !this.isNavExpand ) {
			this.isMenuExpandChange.emit(false);
		}
	}
	public menuItems: any[];
    @Input() isNavExpand: boolean;
    @Input() isMenuExpand: boolean;
	@Output() isNavExpandChange = new EventEmitter<boolean>();
	@Output() isMenuExpandChange = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

	toggleSidebar() {
		this.isNavExpandChange.emit(!this.isNavExpand);
	}
}
