import { Component, Input } from '@angular/core';


@Component( {
	selector: 'smart-folders',
	templateUrl: './smart-folders.component.html',
	styleUrls: ['./smart-folders.component.scss']
} )

export class SmartFoldersComponent  {
	@Input() foldersData: Object;
	@Input() foldersList: Array<any>;

	constructor() { }
}
