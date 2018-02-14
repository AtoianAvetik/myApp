import { Directive, HostListener, Input } from '@angular/core';

import { PanelService } from './panel.service';

@Directive( {
	selector: '[openPanel]'
} )
export class OpenPanelDirective {
	@Input( 'openPanel' ) id: string;

	constructor( private _panelService: PanelService ) {
	}

	@HostListener( 'click', ['$event'] )
	onClick( e ) {
		e.stopPropagation();
		this._panelService.openPanel( this.id );
	}
}
