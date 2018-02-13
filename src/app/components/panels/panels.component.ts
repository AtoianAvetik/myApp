import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Panel } from './panel.model';
import { PanelService } from './panel.service';

@Component( {
	selector: 'app-panels',
	template: `
		<div class="app-panel-container"></div>
		<div
			*ngIf="overlay"
			(click)="overlayClick($event)"
			class="app-panel-overlay"
			[@overlay]='isOpen ? "open" : "close"'>
		</div>
	`,
	styleUrls: ['./panels.component.scss'],
	animations: [
		trigger( 'overlay', [
			state( 'open', style( { opacity: 1 } ) ),
			state( 'close', style( { opacity: 0, display: 'none' } ) ),
			transition( 'close => open', animate( '300ms' ) ),
			transition( 'open => close', animate( '300ms' ) )
		] )
	]
} )
export class PanelsComponent implements OnInit {
	@Input() overlay = true;
	private _isOpen = false;

	@Input()
	set isOpen( value: boolean ) {
		this._isOpen = value;
	}

	get isOpen() {
		return this._isOpen;
	}

	constructor( private _panelService: PanelService,
	             private elRef: ElementRef ) {
	}

	ngOnInit() {
		this._panelService.isPanelsChanged
			.subscribe(
				( data: Array<Panel> ) => {
					(data.length < 1) && (this.isOpen = false);
					for ( const panel of data ) {
						this.elRef.nativeElement.querySelector( '.app-panel-container' ).appendChild( panel.el.nativeElement );
					}
				}
			);
		this._panelService.panelOpeningDidStart
			.subscribe(
				() => {
					this.isOpen = true;
				}
			);
		this._panelService.panelClosingDidStart
			.subscribe(
				() => {
					!this._panelService.activePanels.length && (this.isOpen = false);
				}
			);
	}

	overlayClick(e) {
		if ( !e.target.closest( '.app-panel' ) ) {
			this._panelService.closeLast();
		}
	}
}
