import {
	ChangeDetectorRef,
	Component, Input, OnInit,
	ViewContainerRef
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';

import { SidebarService } from '../../_services/sidebar.service';

@Component( {
	selector: 'app-navigation-item',
	templateUrl: './navigation-item.component.html',
	animations: [
		trigger( 'slide', [
			state( 'down', style( { height: '*', display: 'block', opacity: 1 } ) ),
			state( 'up', style( { height: 0, display: 'none', opacity: 0 } ) ),
			transition( 'up => down', animate( '150ms' ) ),
			transition( 'down => up', animate( '150ms' ) )
		] )
	]
} )

export class NavigationItemComponent implements OnInit {
	@Input() menuItem;
	private isActiveRoute = false;
	private isNavCollapsedOpen = false;
	private _isOpen = false;

	@Input()
	set isOpen( value: boolean ) {
		this._isOpen = value;
	}

	get isOpen() {
		return this._isOpen;
	}

	constructor(private _router: Router,
	            public _vcr: ViewContainerRef,
	            private _cdr: ChangeDetectorRef,
	            private _sidebarService: SidebarService) {
		this._router.events
			.subscribe((event) => {
				if (event instanceof NavigationEnd) {
					this.setActiveRoute();
				}
			});
	}

	// constructor(@Inject(forwardRef(() => SidebarComponent)) private _parent:SidebarComponent) {
	// 	console.log(_parent);
	// }

	ngOnInit() {
		this.setActiveRoute();
		this._sidebarService.isMenuExpandChange
			.subscribe((status) => {
				if ( status ) {
					this.isNavCollapsedOpen && (this.isOpen = true);
				} else {
					this.isOpen = false;
				}
			})
	}

	openParentTree() {
		let parentComponent = this._vcr['_data'].componentView.component._vcr['_view'].component;

		while (parentComponent.menuItem) {
			parentComponent.isOpen = true;
			parentComponent.isActiveRoute = true;
			parentComponent.isNavCollapsedOpen = true;
			parentComponent = parentComponent._vcr['_view'].component;
		}
	}

	setActiveRoute() {
		if ( this._router.url === this.menuItem.path ) {
			this.openParentTree();
		} else if ( this._router.url.indexOf( this.menuItem.path ) === 0 ) {
			this.isActiveRoute = true;
			this.openParentTree();
		} else {
			this.isActiveRoute = false;
			this.isNavCollapsedOpen = false;
			this.isOpen = false; // close other menu lists
		}
		this._cdr.detectChanges();
	}

	onToggleMenu( event: MouseEvent ) {
		event.preventDefault();
		event.stopPropagation();
		this.isOpen = !this.isOpen;
		this.isNavCollapsedOpen = this.isOpen;
	}
}
