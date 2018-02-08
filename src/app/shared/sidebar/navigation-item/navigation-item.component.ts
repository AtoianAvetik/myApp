import {
	ChangeDetectorRef,
	Component, forwardRef, Inject, Input, OnInit,
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
			state( 'down', style( { height: '*', display: 'block' } ) ),
			state( 'up', style( { height: 0, display: 'none' } ) ),
			state( 'firstLoad', style( { height: 0, display: 'none' } ) ),
			transition( 'up => down', animate( '150ms' ) ),
			transition( 'down => up', animate( '150ms' ) )
		] )
	]
} )

export class NavigationItemComponent implements OnInit {
	@Input() menuItem;
	private isActiveRoute = false;
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
			.filter((event) => event instanceof NavigationEnd)
			.subscribe(() => {
				this.openParentTree();
			});
	}

	// constructor(@Inject(forwardRef(() => SidebarComponent)) private _parent:SidebarComponent) {
	// 	console.log(_parent);
	// }

	ngOnInit() {
		this.openParentTree();
	}

	openParentTree() {
		if ( this._router.url === this.menuItem.path ) {
			let parentComponent = this._vcr['_data'].componentView.component._vcr['_view'].component;

			while (parentComponent.menuItem) {
				parentComponent.isOpen = true;
				parentComponent.isActiveRoute = true;
				parentComponent = parentComponent._vcr['_view'].component;
			}
		} else {
			this.isActiveRoute = false;
			this.isOpen = false; // close other menu lists
		}
		this._cdr.detectChanges();
	}

	onToggleMenu( event: MouseEvent ) {
		event.preventDefault();
		event.stopPropagation();
		this.isOpen = !this.isOpen;
	}
}
