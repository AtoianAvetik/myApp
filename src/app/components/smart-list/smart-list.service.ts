import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SmartListService {
	listItemSelected = new Subject<number>();
	listSelected = new Subject<number>();
	viewTypeChanged = new Subject<string>();
	editSelectedItem = new Subject();
	deleteSelectedItem = new Subject();

	constructor() {
	}
}
