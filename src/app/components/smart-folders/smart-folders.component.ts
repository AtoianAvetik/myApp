import { Component, ContentChild, Input, TemplateRef } from '@angular/core';


@Component( {
	selector: 'smart-folders',
	templateUrl: './smart-folders.component.html',
	styleUrls: ['./smart-folders.component.scss']
} )

export class SmartFoldersComponent  {
	@Input() foldersData: Object;
	@Input() foldersList: Array<any>;
	@ContentChild(TemplateRef) templateRef: TemplateRef<any>;

	constructor() { }
}
