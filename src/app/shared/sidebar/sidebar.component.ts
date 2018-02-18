import { Component, HostListener, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { ROUTES } from './sidebar-routes.config';
import { SidebarService } from '../_services/sidebar.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	animations: [
		trigger('slide', [
			state('down', style({height: '*', display: 'block'})),
			state('up', style({height: 0, display: 'none'})),
			transition('up => down', animate('300ms')),
			transition('down => up', animate('300ms'))
		])
	]
})

export class SidebarComponent implements OnInit {
	@HostListener('mouseenter') onMouseenter() {
		this.onHoverSidebar(true);
	}

	@HostListener('mouseleave') onMouseleave() {
		this.onHoverSidebar(false);
	}

	@HostListener('window:resize', ['$event']) onResize(event) {
		this.onHideSidebar();
	}

	@HostListener('document:click', ['$event']) onClick(event) {
		this.onClickOutside(event);
	}

	public menuItems: any[];
	public isNavExpand: boolean;

	constructor(private _sidebarService: SidebarService) {
		this.isNavExpand = this._sidebarService.isNavExpand;
		this._sidebarService.isNavExpandChange.subscribe(status => this.isNavExpand = status);
	}

	ngOnInit() {
		this.menuItems = ROUTES.filter(menuItem => menuItem);
		this.onHideSidebar();
	}

	onHoverSidebar(value) {
		this._sidebarService.hoverSidebar(value);
	}

	onToggleSidebar(value) {
		event.preventDefault();
		event.stopPropagation();
		this._sidebarService.toggleSidebar(value);
	}

	onHideSidebar() {
		this._sidebarService.hideSidebar();
	}

	onClickOutside(e) {
		if (!e.target.closest('app-sidebar')) {
			this._sidebarService.hideSidebar();
		}
	}
}
