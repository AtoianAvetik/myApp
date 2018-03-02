import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { SmartListItemModel } from './smart-list-item.model';

@Injectable()
export class SmartListControlsService {
	selectItem = new Subject<SmartListItemModel>();
	deselectItem = new Subject<SmartListItemModel>();
	deselectAll = new Subject();
}
