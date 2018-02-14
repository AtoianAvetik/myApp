import { Directive, HostListener, Input } from '@angular/core';

import { ModalService } from './modal.service';

@Directive( {
	selector: '[closeModal]'
} )
export class CloseModalDirective {
	@Input( 'closeModal' ) id: string;

	constructor( private _modalService: ModalService ) {
	}

	@HostListener( 'click' )
	onClick() {
		this._modalService.closeModal( this.id );
	}
}
