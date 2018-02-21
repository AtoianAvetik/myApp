import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SmartListService {
	viewTypeChanged = new Subject<string>();
	selectItem = new Subject<number>();
	selectList = new Subject<string>();
	editSelectedItem = new Subject();
	deleteSelectedItem = new Subject();

	constructor() {
	}
}
