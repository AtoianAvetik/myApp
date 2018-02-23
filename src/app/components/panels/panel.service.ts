import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as _ from 'underscore';

import { Panel } from './panel.model';

@Injectable()
export class PanelService {
	private panels: any[] = [];
	activePanels: any[] = [];
	panelWillOpened = new Subject<string>();
	panelWillClosed = new Subject<string>();
	panelClosingDidStart = new Subject();
	panelClosingDidDone = new Subject();
	panelOpeningDidStart = new Subject();
	panelOpeningDidDone = new Subject();
	isPanelsChanged = new Subject();
	isPanelHide: boolean = false;
	isPanelExpand: boolean = true;
	panelState = 'expanded';
	stateEvents = {
		left: {
			expand: new Subject<boolean>(),
			hide: new Subject<boolean>()
		},
		right: {
			expand: new Subject<boolean>(),
			hide: new Subject<boolean>()
		}
	};

	constructor() {
		// Subscribe state events and update state
		this.stateEvents.left.expand.subscribe(status => {
			this.isPanelExpand = status;
			this.updateState();
		});
		this.stateEvents.left.hide.subscribe(status => {
			this.isPanelHide = status;
			this.updateState();
		});
		this.stateEvents.right.expand.subscribe(status => {
			this.isPanelExpand = status;
			this.updateState();
		});
		this.stateEvents.right.hide.subscribe(status => {
			this.isPanelHide = status;
			this.updateState();
		});
	}

	add( panel: Panel ) {
		// add panel to array of active panels-page
		this.panels.push( panel );
		this.isPanelsChanged.next( this.panels.slice() );
	}

	remove( id: string ) {
		// remove panel from array of active panels-page
		const panelToRemove = _.findWhere( this.panels, { id: id } );
		this.panels = _.without( this.panels, panelToRemove );
		this.isPanelsChanged.next( this.panels.slice() );
	}

	addToActive( id: string ) {
		this.activePanels.push(id);
	}

	removeFromActive( id: string ) {
		const index: number = this.activePanels.indexOf( id );
		if ( index !== -1 ) {
			this.activePanels.splice( index, 1 );
		}
	}

	openPanel( id: string ) {
		this.panelWillOpened.next(id);
	}

	closePanel( id?: string  ) {
		this.panelWillClosed.next(id || this.activePanels[this.activePanels.length - 1]);
	}

	updateState() {
		this.panelState = this.isPanelHide ? 'hidden' : (this.isPanelExpand ? 'expanded' : 'collapsed');
	}
}
