import {
	Component, ElementRef, Injector, Input, OnDestroy, OnInit,
	ViewEncapsulation
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

import { PanelService } from '../panel.service';
import { DEFAULT_PANEL_CONFIG, PANEL_CONFIG, PanelConfigInterface } from '../panel.config';

@Component( {
	selector: 'app-panel',
	template: `
		<div class="app-panel-wrap"
		     [ngStyle]="styles"
		     [@panel]='{
		     	value: isOpen ? this.openState : this.closeState,
		     	params: {
		     		leftCollapsedWidth: config.leftPanelCollapsedShift,
		     		leftExpandedWidth: config.leftPanelExpandedShift,
		     		rightCollapsedWidth: config.rightPanelCollapsedShift,
		     		rightExpandedWidth: config.rightPanelExpandedShift
		     	}
		     }'
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
			state( 'openLeftCollapsed', style( { left: 0, transform: 'translateX({{ leftCollapsedWidth }}px)' } ), { params: { leftCollapsedWidth: DEFAULT_PANEL_CONFIG.leftPanelCollapsedShift } } ),
			state( 'openLeftExpanded', style( { left: 0, transform: 'translateX({{ leftExpandedWidth }}px)' } ), { params: { leftExpandedWidth: DEFAULT_PANEL_CONFIG.leftPanelExpandedShift } } ),
			state( 'closeLeftHidden', style( { left: 0, transform: 'translateX(-100%)' } ) ),
			state( 'closeLeftCollapsed', style( { left: 0, transform: 'translateX(calc(-100% + {{ leftCollapsedWidth }}px))' } ), { params: { leftCollapsedWidth: DEFAULT_PANEL_CONFIG.leftPanelCollapsedShift } } ),
			state( 'closeLeftExpanded', style( { left: 0, transform: 'translateX(calc(-100% + {{ leftExpandedWidth }}px))' } ), { params: { leftExpandedWidth: DEFAULT_PANEL_CONFIG.leftPanelExpandedShift } } ),

			state( 'openRightHidden', style( { right: 0, transform: 'none' } ) ),
			state( 'openRightCollapsed', style( { right: 0, transform: 'translateX(-{{ rightCollapsedWidth }}px)' } ), { params: { rightCollapsedWidth: DEFAULT_PANEL_CONFIG.rightPanelCollapsedShift } } ),
			state( 'openRightExpanded', style( { right: 0, transform: 'translateX(-{{ rightExpandedWidth }}px)' } ), { params: { rightExpandedWidth: DEFAULT_PANEL_CONFIG.rightPanelExpandedShift } } ),
			state( 'closeRightHidden', style( { right: 0, transform: 'translateX(100%)' } ) ),
			state( 'closeRightCollapsed', style( { right: 0, transform: 'translateX(calc(100% - {{ rightCollapsedWidth }}px))' } ), { params: { rightCollapsedWidth: DEFAULT_PANEL_CONFIG.rightPanelCollapsedShift } } ),
			state( 'closeRightExpanded', style( { right: 0, transform: 'translateX(calc(100% - {{ rightExpandedWidth }}px))' } ), { params: { rightExpandedWidth: DEFAULT_PANEL_CONFIG.rightPanelExpandedShift } } ),

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
			expanded: {
				open: 'openRightExpanded',
				close: 'closeRightExpanded'
			},
			collapsed: {
				open: 'openRightCollapsed',
				close: 'closeRightCollapsed'
			},
			hidden: {
				open: 'openRightHidden',
				close: 'closeRightHidden'
			}
		}
	};
	openStatuses = [
		this.statuses.left.expanded.open,
		this.statuses.left.collapsed.open,
		this.statuses.left.hidden.open,
		this.statuses.right.expanded.open,
		this.statuses.right.collapsed.open,
		this.statuses.right.hidden.open,
	];
	closeStatuses = [
		this.statuses.left.expanded.open,
		this.statuses.left.collapsed.open,
		this.statuses.left.hidden.open,
		this.statuses.right.expanded.open,
		this.statuses.right.collapsed.open,
		this.statuses.right.hidden.open,
	];
	subscriptions: Array<Subscription> = [];
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
	             private _elRef: ElementRef,
	             injector: Injector) {
		this.config = Object.assign({}, DEFAULT_PANEL_CONFIG, injector.get(PANEL_CONFIG));
		this.el = this._elRef;
		this.element = this._elRef.nativeElement;
	}

	ngOnInit() {
		// direction
		this.updateStates(this.dir);
		this.subscriptions.push( this._panelService.stateEvents[this.dir].expand.subscribe( _ => this.updateStates(this.dir)));
		this.subscriptions.push( this._panelService.stateEvents[this.dir].hide.subscribe( _ => this.updateStates(this.dir)));

		// ensure id attribute exists
		if ( !this.id ) {
			console.error( 'panel must have an id' );
			return;
		}

		// add self (this panel instance) to the panel service so it's accessible from controllers
		this._panelService.add( this );

		// subscribe events
		this.subscriptions.push( this._panelService.panelWillOpened.subscribe(
				( id: string ) => {
					if ( id === this.id ) {
						this.open();
					}
				}
			)
		);
		this.subscriptions.push( this._panelService.panelWillClosed.subscribe(
				( id: string ) => {
					if ( id === this.id ) {
						this.close();
					}
				}
			)
		);
	}

	// remove self from panel service when directive is destroyed
	ngOnDestroy(): void {
		this._panelService.remove( this.id );
		this._panelService.removeFromActive( this.id );
		this.element.parentNode.removeChild( this.element );
		this.subscriptions.forEach( ( subscription: Subscription ) => {
			subscription.unsubscribe();
		} );
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

	updateStates(dir: string) {
		this.openState = this.statuses[dir][this._panelService.panelState].open;
		this.closeState = this.statuses[dir][this._panelService.panelState].close;
	}

	setStyle( i: number) {
		this.styles = {
			"zIndex": i
		};
	}

	animationAction( event ) {
		switch ( event.phaseName ) {
			case 'start':
				this.openStatuses.includes(event.toState) && this._panelService.panelOpeningDidStart.next();
				this.closeStatuses.includes(event.toState) && this._panelService.panelClosingDidStart.next();
				break;
			case 'done':
				this.openStatuses.includes(event.toState) && this._panelService.panelOpeningDidDone.next();
				this.closeStatuses.includes(event.toState) && this._panelService.panelClosingDidDone.next();
				break;
		}
	}
}
