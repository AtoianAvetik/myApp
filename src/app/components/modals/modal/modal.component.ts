import { Component, ElementRef, Input, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

import { ModalService } from '../modal.service';

@Component( {
	moduleId: module.id.toString(),
	selector: 'app-modal',
	template: `
		<div class="app-modal-wrap"
		     (click)="onWrapClick($event);"
		     [ngClass]="{'-is-forward': isForward}"
		     [@zindex]='isForward ? "open" : "close"'
		     [@modal]='isOpen ? "open" : "close"'
		     (@modal.start)="animationAction($event)"
		     (@modal.done)="animationAction($event)">
			<ng-content></ng-content>
		</div>
	`,
	styleUrls: ['./modal.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: [
		trigger( 'modal', [
			state( 'open', style( { opacity: 1, transform: 'scale(1.0, 1.0)' } ) ),
			state( 'close', style( { opacity: 0, transform: 'scale(0, 0)' } ) ),
			transition( 'close => open, open => close', animate( '0.3s cubic-bezier(0.680, -0.550, 0.265, 1.550)' ) )
		] ),
		trigger( 'zindex', [
			state( 'open', style( { zIndex: 2 } ) ),
			state( 'close', style( { zIndex: 1 } ) ),
			transition( 'close => open, open => close', animate( '0.3s' ) ),
		] )
	]
} )

export class ModalComponent implements OnInit, OnDestroy {
	@Input() id: string;
	private _isOpen = false;
	private _isForward = false;
	subscriptions: Array<Subscription> = [];
	element;
	el;

	@Input()
	set isOpen( value: boolean ) {
		this._isOpen = value;
	}

	get isOpen() {
		return this._isOpen;
	}

	@Input()
	set isForward( value: boolean ) {
		this._isForward = value;
	}

	get isForward() {
		return this._isForward;
	}

	constructor( private _modalService: ModalService,
	             private elRef: ElementRef ) {
		this.el = this.elRef;
		this.element = this.elRef.nativeElement;
	}

	ngOnInit(): void {
		// ensure id attribute exists
		if ( !this.id ) {
			console.error( 'modal must have an id' );
			return;
		}

		// add self (this modal instance) to the modal service so it's accessible from controllers
		this._modalService.add( this );
		// subscribe events
		this.subscriptions.push( this._modalService.modalWillOpened.subscribe(
			( id: string ) => {
				if ( id === this.id ) {
					this.open();
				}
			}
		) );
		this.subscriptions.push( this._modalService.modalWillClosed.subscribe(
			( id: string ) => {
				if ( id === this.id ) {
					this.close();
				}
			}
		) );
		this.subscriptions.push( this._modalService.forwardActiveChanged.subscribe(
			( id: string ) => {
				this.isForward = (id === this.id);
			}
		) );
	}

	// remove self from modal service when directive is destroyed
	ngOnDestroy(): void {
		this._modalService.remove( this.id );
		this._modalService.removeFromActive( this.id );
		this.element.parentNode.removeChild( this.element );
		this.subscriptions.forEach( ( subscription: Subscription ) => {
			subscription.unsubscribe();
		} );
	}

	// open modal
	open(): void {
		this._modalService.addToActive( this.id );
		this.isOpen = true;
	}

	// close modal
	close(): void {
		this._modalService.removeFromActive( this.id );
		this.isOpen = false;
	}

	animationAction( event ) {
		switch ( event.phaseName ) {
			case 'start':
				switch ( event.toState ) {
					case 'open':
						this._modalService.modalOpeningDidStart.next( this.id );
						break;
					case 'close':
						this._modalService.modalClosingDidStart.next( this.id );
						break;
				}
				break;
			case 'done':
				switch ( event.toState ) {
					case 'open':
						this._modalService.modalOpeningDidDone.next( this.id );
						break;
					case 'close':
						this._modalService.modalClosingDidDone.next( this.id );
						break;
				}
				break;
		}
	}

	onWrapClick( e ) {
		if ( !e.target.closest( '.app-modal' ) ) {
			this._modalService.closeModal();
		}
	}
}
