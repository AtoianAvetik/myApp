import { Directive, HostListener, Input } from '@angular/core';

import { ModalService } from './modal.service';

@Directive( {
	selector: '[openModal]'
} )
export class OpenModalDirective {
	@Input( 'openModal' ) id: string;

	constructor( private _modalService: ModalService ) {
	}

	@HostListener( 'click' )
	onClick() {
		this._modalService.openModal( this.id );
	}
}
