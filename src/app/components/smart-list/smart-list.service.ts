import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SmartListService {
	selectItem = new Subject<number>();
	selectList = new Subject<string>();
	editSelectedItem = new Subject();
	deleteSelectedItem = new Subject();

	constructor() {
	}
}
