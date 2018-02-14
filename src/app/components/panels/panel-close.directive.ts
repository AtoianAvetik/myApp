import { Directive, HostListener, Input } from '@angular/core';

import { PanelService } from './panel.service';

@Directive( {
	selector: '[closePanel]'
} )
export class ClosePanelDirective {
	@Input( 'closePanel' ) id: string;

	constructor( private _panelService: PanelService ) {
	}

	@HostListener( 'click', ['$event'] )
	onClick( e ) {
		e.stopPropagation();
		this._panelService.closePanel( this.id );
	}
}
