import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

import { SmartFolderModel } from './smart-folder.model';

@Component( {
	selector: 'smart-folders',
	templateUrl: './smart-folders.component.html',
	styleUrls: ['./smart-folders.component.scss']
} )

export class SmartFoldersComponent  {
	@Input() foldersData: {[name: string]: SmartFolderModel};
	@Input() foldersList: Array<string>;
	@ContentChild(TemplateRef) templateRef: TemplateRef<any>;

	constructor() { }
}
