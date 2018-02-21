import { Component, ElementRef, Injector, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

import { PanelService } from '../panel.service';
import { SidebarService } from '../../../shared/_services/sidebar.service';
import { PANEL_CONFIG, PanelConfigInterface } from '../panel.config';

const DEFAULT_PANEL_CONFIG: PanelConfigInterface = {
	sidebarExpandedWidth: 0,
	sidebarCollapsedWidth: 0
};

@Component( {
	selector: 'app-panel',
	template: `
		<div class="app-panel-wrap"
		     [ngStyle]="styles"
		     [@panel]='{value: isOpen ? this.openState : this.closeState, params: {expandedWidth: config.sidebarExpandedWidth, collapsedWidth: config.sidebarCollapsedWidth}}'
		     (@panel.start)="animationAction($event)"
		     (@panel.done)="animationAction($event)">
			<ng-content></ng-content>
		</div>
	`,
	styleUrls: ['./panel.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: [
		trigger( 'panel', [
			state( 'openLeftHidden', style( { left: 0, transform: 'none' } ) ),
			state( 'openLeftCollapsed', style( { left: 0, transform: 'translateX({{ collapsedWidth }}px)' } ), { params: { collapsedWidth: 0 } } ),
			state( 'openLeftExpanded', style( { left: 0, transform: 'translateX({{ expandedWidth }}px)' } ), { params: { expandedWidth: 0 } } ),
			state( 'closeLeftHidden', style( { left: 0, transform: 'translateX(-100%)' } ) ),
			state( 'closeLeftCollapsed', style( { left: 0, transform: 'translateX(calc(-100% + {{ collapsedWidth }}px))' } ), { params: { collapsedWidth: 0 } } ),
			state( 'closeLeftExpanded', style( { left: 0, transform: 'translateX(calc(-100% + {{ expandedWidth }}px))' } ), { params: { expandedWidth: 0 } } ),
			state( 'openRight', style( { right: 0, transform: 'translateX(0px)' } ) ),
			state( 'closeRight', style( { right: 0, transform: 'translateX(100%)' } ) ),
			transition('void => *', animate('0s')),
			transition('* => *', animate('0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99)'))
		] )
	]
} )
export class PanelComponent implements OnInit, OnDestroy {
	@Input() id: string;
	@Input() dir: string = 'left';
	private _isOpen = false;
	statuses = {
		left: {
			expanded: {
				open: 'openLeftExpanded',
				close: 'closeLeftExpanded'
			},
			collapsed: {
				open: 'openLeftCollapsed',
				close: 'closeLeftCollapsed'
			},
			hidden: {
				open: 'openLeftHidden',
				close: 'closeLeftHidden'
			}
		},
		right: {
			open: 'openRight',
			close: 'closeRight'
		}
	};
	openSubscription: Subscription;
	closeSubscription: Subscription;
	openState: string;
	closeState: string;
	styles = {};
	element;
	el: ElementRef;
	config: PanelConfigInterface;

	@Input()
	set isOpen( value: boolean ) {
		this._isOpen = value;
	}

	get isOpen() {
		return this._isOpen;
	}

	constructor( private _panelService: PanelService,
	             private _sidebarService: SidebarService,
	             private elRef: ElementRef,
	             injector: Injector) {
		this.config = Object.assign(DEFAULT_PANEL_CONFIG, injector.get(PANEL_CONFIG));
		this.el = this.elRef;
		this.element = this.elRef.nativeElement;
	}

	ngOnInit() {
		// direction
		switch ( this.dir ) {
			case 'left':
				this.updateStates();
				this._sidebarService.isNavExpandChange.subscribe( _ => this.updateStates());
				this._sidebarService.isHideSidebarChange.subscribe( _ => this.updateStates());
				break;
			case 'right':
				this.openState = this.statuses.right.open;
				this.closeState = this.statuses.right.close;
				break;
		}

		// ensure id attribute exists
		if ( !this.id ) {
			console.error( 'panel must have an id' );
			return;
		}

		// add self (this panel instance) to the panel service so it's accessible from controllers
		this._panelService.add( this );

		// subscribe events
		this.openSubscription = this._panelService.panelWillOpened
			.subscribe(
				( id: string ) => {
					if ( id === this.id ) {
						this.open();
					}
				}
			);
		this.closeSubscription = this._panelService.panelWillClosed
			.subscribe(
				( id: string ) => {
					if ( id === this.id ) {
						this.close();
					}
				}
			);
	}

	// remove self from panel service when directive is destroyed
	ngOnDestroy(): void {
		this._panelService.remove( this.id );
		this._panelService.removeFromActive( this.id );
		this.element.parentNode.removeChild( this.element );
		this.openSubscription.unsubscribe();
		this.closeSubscription.unsubscribe();
	}

	// open panel
	open(): void {
		this._panelService.addToActive( this.id );
		this.setStyle(this._panelService.activePanels.length);
		this.isOpen = true;
	}

	// close panel
	close(): void {
		this._panelService.removeFromActive( this.id );
		this.isOpen = false;
	}

	updateStates() {
		this.openState = this.statuses.left[this._sidebarService.sidebarState].open;
		this.closeState = this.statuses.left[this._sidebarService.sidebarState].close;
	}

	setStyle( i: number) {
		this.styles = {
			"zIndex": i
		};
	}

	animationAction( event ) {
		switch ( event.phaseName ) {
			case 'start':
				switch ( event.toState ) {
					case this.statuses.left.expanded.open:
						this._panelService.panelOpeningDidStart.next();
						break;
					case this.statuses.left.collapsed.open:
						this._panelService.panelOpeningDidStart.next();
						break;
					case this.statuses.left.hidden.open:
						this._panelService.panelOpeningDidStart.next();
						break;
					case this.statuses.right.open:
						this._panelService.panelOpeningDidStart.next();
						break;
					case this.statuses.left.expanded.close:
						this._panelService.panelClosingDidStart.next();
						break;
					case this.statuses.left.collapsed.close:
						this._panelService.panelClosingDidStart.next();
						break;
					case this.statuses.left.hidden.close:
						this._panelService.panelClosingDidStart.next();
						break;
					case this.statuses.right.close:
						this._panelService.panelClosingDidStart.next();
						break;
				}
				break;
			case 'done':
				switch ( event.toState ) {
					case this.statuses.left.expanded.open:
						this._panelService.panelOpeningDidDone.next();
						break;
					case this.statuses.left.collapsed.open:
						this._panelService.panelOpeningDidDone.next();
						break;
					case this.statuses.left.hidden.open:
						this._panelService.panelOpeningDidDone.next();
						break;
					case this.statuses.right.open:
						this._panelService.panelOpeningDidDone.next();
						break;
					case this.statuses.left.expanded.close:
						this._panelService.panelClosingDidDone.next();
						break;
					case this.statuses.left.collapsed.close:
						this._panelService.panelClosingDidDone.next();
						break;
					case this.statuses.left.hidden.close:
						this._panelService.panelClosingDidDone.next();
						break;
					case this.statuses.right.close:
						this._panelService.panelClosingDidDone.next();
						break;
				}
				break;
		}
	}
}
