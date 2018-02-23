import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { WindowRef } from './window-ref';

@Injectable()
export class SidebarService {
	isNavExpand = true;
	isMenuExpand = true;
	isHideSidebar = false;
	isSidebarHiddenNavExpand = true;
	isSidebarHiddenMenuExpand = false;
	isNavExpandChange = new Subject<boolean>();
	isMenuExpandChange = new Subject<boolean>();
	isHideSidebarChange = new Subject<boolean>();

	constructor(private _winRef: WindowRef) {
		this.isNavExpandChange.subscribe(status => {
			this.isNavExpand = status;
		});
		this.isMenuExpandChange.subscribe(status => {
			this.isMenuExpand = status;
		});
		this.isHideSidebarChange.subscribe(status => {
			this.isHideSidebar = status;
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
		if ( this._winRef.nativeWindow.innerWidth < 992 ) {
			this.isHideSidebarChange.next(true);
			this.isMenuExpandChange.next(true);
			this.isNavExpandChange.next(true);
		} else {
			this.isHideSidebarChange.next(false);
			this.hoverSidebar(this.isSidebarHiddenMenuExpand);
			this.toggleSidebar(this.isSidebarHiddenNavExpand);
		}
	}
}
