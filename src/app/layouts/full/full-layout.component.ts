import { Component, OnInit, ElementRef } from '@angular/core';

import { SidebarService } from '../../shared/_services/sidebar.service';
import { PanelService } from '../../components/panels/panel.service';
import { LoaderService } from '../../components/loader/loader.service';

var fireRefreshEventOnWindow = function () {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent('resize', true, false);
    window.dispatchEvent(evt);
};

@Component({
    selector: 'app-full-layout',
    templateUrl: './full-layout.component.html',
    styleUrls: ['./full-layout.component.scss'],
	providers: [SidebarService, PanelService, LoaderService]
})

export class FullLayoutComponent implements OnInit {
	isNavExpand: boolean;
	isMenuExpand: boolean;
	isHideSidebar: boolean;

    constructor(private elementRef: ElementRef,
                private _sidebarService: SidebarService,
                private _panelService: PanelService) {
	    this.isNavExpand = this._sidebarService.isNavExpand;
	    this.isMenuExpand = this._sidebarService.isMenuExpand;
	    this.isHideSidebar = this._sidebarService.isHideSidebar;
	    this._sidebarService.isNavExpandChange.subscribe(status => this.isNavExpand = status);
	    this._sidebarService.isMenuExpandChange.subscribe(status => this.isMenuExpand = status);
	    this._sidebarService.isHideSidebarChange.subscribe(status => this.isHideSidebar = status);
    }

    ngOnInit() {
        //sidebar toggle event listner
        this.elementRef.nativeElement.querySelector('#sidebarToggle')
            .addEventListener('click', this.onClick.bind(this));
        //customizer events
        // this.elementRef.nativeElement.querySelector('#cz-compact-menu')
        //     .addEventListener('click', this.onClick.bind(this));
        // this.elementRef.nativeElement.querySelector('#cz-sidebar-width')
        //     .addEventListener('click', this.onClick.bind(this));
    }

    onClick(event) {
        //initialize window resizer event on sidebar toggle click event
        setTimeout(() => { fireRefreshEventOnWindow() }, 300);
    }

    onWrapClick($event) {
	    this._sidebarService.hideSidebar();
	    this._panelService.closeLast();
    }
}
