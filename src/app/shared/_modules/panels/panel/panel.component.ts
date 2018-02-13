import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

import { PanelService } from '../../../_services/panel.service';
import { SidebarService } from '../../../_services/sidebar.service';

@Component( {
	selector: 'app-panel',
	template: `
		<div class="app-panel-wrap"
		     [@panel]='isOpen ? this.openState : this.closeState'
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
			state( 'openLeftCollapsed', style( { left: 0, transform: 'translateX(' + 60 + 'px)' } ) ),
			state( 'openLeftExpanded', style( { left: 0, transform: 'translateX(' + 250 + 'px)' } ) ),
			state( 'closeLeftHidden', style( { left: 0, transform: 'translateX(-100%)' } ) ),
			state( 'closeLeftCollapsed', style( { left: 0, transform: 'translateX(calc(-100% + ' + 60 + 'px))' } ) ),
			state( 'closeLeftExpanded', style( { left: 0, transform: 'translateX(calc(-100% + ' + 250 + 'px))' } ) ),
			state( 'openRight', style( { right: 0, transform: 'translateX(0px)' } ) ),
			state( 'closeRight', style( { right: 0, transform: 'translateX(100%)' } ) ),
			transition( 'openRight => closeRight', animate( '.2s' ) ),
			transition( 'closeRight => openRight', animate( '.2s' ) ),
			transition( 'openLeftCollapsed => closeLeftCollapsed', animate( '.3s' ) ),
			transition( 'closeLeftCollapsed => openLeftCollapsed', animate( '.3s' ) ),
			transition( 'openLeftExpanded => closeLeftExpanded', animate( '.3s' ) ),
			transition( 'closeLeftExpanded => openLeftExpanded', animate( '.3s' ) ),
			transition( 'openLeftHidden => closeLeftHidden', animate( '.3s' ) ),
			transition( 'closeLeftHidden => openLeftHidden', animate( '.3s' ) ),
			transition( 'openLeftCollapsed => openLeftExpanded', animate( '0.3s cubic-bezier(.55, 0, .1, 1)' ) ),
			transition( 'openLeftExpanded => openLeftCollapsed', animate( '0.3s cubic-bezier(.55, 0, .1, 1)' ) ),
			transition( 'openLeftHidden => openLeftCollapsed', animate( '0.3s cubic-bezier(.55, 0, .1, 1)' ) ),
			transition( 'openLeftHidden => openLeftExpanded', animate( '0.3s cubic-bezier(.55, 0, .1, 1)' ) ),
			transition( 'openLeftExpanded => openLeftHidden', animate( '0.3s cubic-bezier(.55, 0, .1, 1)' ) ),
			transition( 'openLeftCollapsed => openLeftHidden', animate( '0.3s cubic-bezier(.55, 0, .1, 1)' ) ),
			transition( 'closeLeftCollapsed => closeLeftExpanded', animate( '0.3s cubic-bezier(.55, 0, .1, 1)' ) ),
			transition( 'closeLeftExpanded => closeLeftCollapsed', animate( '0.3s cubic-bezier(.55, 0, .1, 1)' ) ),
			transition( 'closeLeftHidden => closeLeftCollapsed', animate( '0.3s cubic-bezier(.55, 0, .1, 1)' ) ),
			transition( 'closeLeftHidden => closeLeftExpanded', animate( '0.3s cubic-bezier(.55, 0, .1, 1)' ) ),
			transition( 'closeLeftExpanded => closeLeftHidden', animate( '0.3s cubic-bezier(.55, 0, .1, 1)' ) ),
			transition( 'closeLeftCollapsed => closeLeftHidden', animate( '0.3s cubic-bezier(.55, 0, .1, 1)' ) )
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
	element;
	el: ElementRef;

	@Input()
	set isOpen( value: boolean ) {
		this._isOpen = value;
	}

	get isOpen() {
		return this._isOpen;
	}

	constructor( private panelService: PanelService,
	             private sidebarService: SidebarService,
	             private elRef: ElementRef ) {
		this.el = this.elRef;
		this.element = this.elRef.nativeElement;
	}

	ngOnInit() {
		// direction
		switch ( this.dir ) {
			case 'left':
				this.updateStates();
				this.sidebarService.isNavExpandChange.subscribe( _ => this.updateStates());
				this.sidebarService.isHideSidebarChange.subscribe( _ => this.updateStates());
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
		this.panelService.add( this );

		// subscribe events
		this.openSubscription = this.panelService.panelWillOpened
			.subscribe(
				( id: string ) => {
					if ( id === this.id ) {
						this.open();
					}
				}
			);
		this.closeSubscription = this.panelService.panelWillClosed
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
		this.panelService.remove( this.id );
		this.panelService.removeFromActive( this.id );
		this.element.parentNode.removeChild( this.element );
		this.openSubscription.unsubscribe();
		this.closeSubscription.unsubscribe();
	}

	// open panel
	open(): void {
		this.panelService.activePanels.push( this.id );
		this.isOpen = true;
	}

	// close panel
	close(): void {
		this.panelService.removeFromActive( this.id );
		this.isOpen = false;
	}

	updateStates() {
		this.openState = this.statuses.left[this.sidebarService.sidebarState].open;
		this.closeState = this.statuses.left[this.sidebarService.sidebarState].close;
	}

	animationAction( event ) {
		switch ( event.phaseName ) {
			case 'start':
				switch ( event.toState ) {
					case this.statuses.left.expanded.open:
						this.panelService.panelOpeningDidStart.next();
						break;
					case this.statuses.left.collapsed.open:
						this.panelService.panelOpeningDidStart.next();
						break;
					case this.statuses.left.hidden.open:
						this.panelService.panelOpeningDidStart.next();
						break;
					case this.statuses.right.open:
						this.panelService.panelOpeningDidStart.next();
						break;
					case this.statuses.left.expanded.close:
						this.panelService.panelClosingDidStart.next();
						break;
					case this.statuses.left.collapsed.close:
						this.panelService.panelClosingDidStart.next();
						break;
					case this.statuses.left.hidden.close:
						this.panelService.panelClosingDidStart.next();
						break;
					case this.statuses.right.close:
						this.panelService.panelClosingDidStart.next();
						break;
				}
				break;
			case 'done':
				switch ( event.toState ) {
					case this.statuses.left.expanded.open:
						this.panelService.panelOpeningDidDone.next();
						break;
					case this.statuses.left.collapsed.open:
						this.panelService.panelOpeningDidDone.next();
						break;
					case this.statuses.left.hidden.open:
						this.panelService.panelOpeningDidDone.next();
						break;
					case this.statuses.right.open:
						this.panelService.panelOpeningDidDone.next();
						break;
					case this.statuses.left.expanded.close:
						this.panelService.panelClosingDidDone.next();
						break;
					case this.statuses.left.collapsed.close:
						this.panelService.panelClosingDidDone.next();
						break;
					case this.statuses.left.hidden.close:
						this.panelService.panelClosingDidDone.next();
						break;
					case this.statuses.right.close:
						this.panelService.panelClosingDidDone.next();
						break;
				}
				break;
		}
	}
}
