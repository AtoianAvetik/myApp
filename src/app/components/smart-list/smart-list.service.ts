import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { SmartListControlsService } from './smart-list-controls.service';
import { SmartListItemModel } from './smart-list-item.model';

@Injectable()
export class SmartListService {
	selectItem = new Subject<SmartListItemModel>();
	deselectItem = new Subject<SmartListItemModel>();
	deselectAll = new Subject<SmartListItemModel>();
	editSelectedItem = new Subject();
	deleteSelectedItem = new Subject();

	constructor(private _slcs: SmartListControlsService) {
		this.selectItem.subscribe( (item: SmartListItemModel) => this._slcs.selectItem.next(item));
		this.deselectItem.subscribe( (item: SmartListItemModel) => this._slcs.deselectItem.next(item));
		this.deselectAll.subscribe( _ => this._slcs.deselectAll.next());
	}
}
