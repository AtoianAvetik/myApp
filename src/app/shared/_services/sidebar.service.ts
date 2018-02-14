import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidebarService {
	sidebarState: string;
	isNavExpand = true;
	isMenuExpand = true;
	isHideSidebar = false;
	isSidebarHiddenNavExpand = true;
	isSidebarHiddenMenuExpand = false;
	isNavExpandChange = new Subject<boolean>();
	isMenuExpandChange = new Subject<boolean>();
	isHideSidebarChange = new Subject<boolean>();

	constructor() {
		this.isNavExpandChange.subscribe(status => {
			this.isNavExpand = status;
			this.updateState();
		});
		this.isMenuExpandChange.subscribe(status => {
			this.isMenuExpand = status;
			this.updateState();
		});
		this.isHideSidebarChange.subscribe(status => {
			this.isHideSidebar = status;
			this.updateState();
		});

	}

	hoverSidebar(value) {
		if ( !this.isNavExpand ) {
			this.isMenuExpandChange.next(value);
			this.isSidebarHiddenMenuExpand = value;
		}
	}

	toggleSidebar(value) {
		this.isNavExpandChange.next(value);
		this.isSidebarHiddenNavExpand = value;
	}

	hideSidebar() {
		if ( window.screen.width < 992 ) {
			this.isHideSidebarChange.next(true);
			this.isMenuExpandChange.next(true);
			this.isNavExpandChange.next(true);
		} else {
			this.isHideSidebarChange.next(false);
			this.hoverSidebar(this.isSidebarHiddenMenuExpand);
			this.toggleSidebar(this.isSidebarHiddenNavExpand);
		}
	}

	updateState() {
		this.sidebarState = this.isHideSidebar ? 'hidden' : (this.isNavExpand ? 'expanded' : 'collapsed');
	}
}
