import {
	ChangeDetectorRef,
	Component, EventEmitter, forwardRef, Inject, Input, OnInit,
	ViewContainerRef
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';

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
	@Input() isMenuExpandChange: EventEmitter<boolean>;
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

	constructor(private _router: Router, public _vcr: ViewContainerRef, private _cdr: ChangeDetectorRef) {
		this._router.events
			.subscribe((event) => {
				if (event instanceof NavigationEnd) {
					this.openParentTree();
				}
			});
	}

	// constructor(@Inject(forwardRef(() => SidebarComponent)) private _parent:SidebarComponent) {
	// 	console.log(_parent);
	// }

	ngOnInit() {
		this.openParentTree();
		this.isMenuExpandChange
			.subscribe((status) => {
				if ( status ) {
					this.isNavCollapsedOpen && (this.isOpen = true);
				} else {
					this.isOpen = false;
				}
			})
	}

	openParentTree() {
		if ( this._router.url === this.menuItem.path ) {
			let parentComponent = this._vcr['_data'].componentView.component._vcr['_view'].component;

			while (parentComponent.menuItem) {
				parentComponent.isOpen = true;
				parentComponent.isActiveRoute = true;
				parentComponent.isNavCollapsedOpen = true;
				parentComponent = parentComponent._vcr['_view'].component;
			}
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
