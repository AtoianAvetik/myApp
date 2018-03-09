import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Modal } from './modal.model';
import { ModalService } from './modal.service';

@Component( {
	selector: 'app-modals',
	template: `
		<div class="app-modal-container"></div>
		<div
			class="app-modal-overlay"
			[@overlay]='isOpen ? "open" : "close"'>
		</div>
	`,
	styleUrls: ['./modals.component.scss'],
	animations: [
		trigger( 'overlay', [
			state( 'open', style( { opacity: 1 } ) ),
			state( 'close', style( { opacity: 0, display: 'none' } ) ),
			transition( 'close => open', animate( '0.3s' ) ),
			transition( 'open => close', animate( '0.3s' ) )
		] )
	]
} )
export class ModalsComponent implements OnInit {
	private _isOpen = false;

	@Input()
	set isOpen( value: boolean ) {
		this._isOpen = value;
	}

	get isOpen() {
		return this._isOpen;
	}

	constructor( private _modalService: ModalService,
	             private elRef: ElementRef ) {
	}

	ngOnInit() {
		this._modalService.isModalsChanged
			.subscribe(
				( data: Array<Modal> ) => {
					(data.length < 1) && (this.isOpen = false);
					for ( const panel of data ) {
						this.elRef.nativeElement.querySelector( '.app-modal-container' ).appendChild( panel.el.nativeElement );
					}
				}
			);
		this._modalService.modalOpeningDidStart
			.subscribe(
				() => {
					document.body.classList.add( 'backstage' );
					this.isOpen = true;
				}
			);
		this._modalService.modalClosingDidStart
			.subscribe(
				() => {
					if ( !this._modalService.activeModals.length ) {
						document.body.classList.remove( 'backstage' );
						this.isOpen = false;
					}
				}
			);
	}
}
