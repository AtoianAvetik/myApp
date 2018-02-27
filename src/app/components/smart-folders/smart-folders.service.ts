import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SmartFoldersService {
	selectFolder = new Subject<string>();
	editSelectedFolder = new Subject();
	deleteSelectedFolder = new Subject();

	// Accordion events
	toggleFolders = new Subject<boolean>();

	constructor() {
	}
}
