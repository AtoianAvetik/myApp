import { Directive, HostListener, Input } from '@angular/core';

import { PanelService } from '../_services/panel.service';

@Directive( {
	selector: '[closePanel]'
} )
export class ClosePanelDirective {
	@Input( 'closePanel' ) id: string;

	constructor( private panelService: PanelService ) {
	}

	@HostListener( 'click', ['$event'] )
	onClick( e ) {
		e.stopPropagation();
		this.panelService.panelWillClosed.next( this.id );
	}
}
