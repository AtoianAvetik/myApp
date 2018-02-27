import { Component, ContentChild, DoCheck, Input, TemplateRef } from '@angular/core';

import { SmartFoldersService } from '../smart-folders.service';

@Component( {
	selector: 'smart-folders-group',
	templateUrl: './smart-folders-group.component.html',
	styleUrls: ['./smart-folders-group.component.scss']
} )

export class SmartFoldersGroupComponent implements DoCheck {
	// Data
	@Input() foldersData: Object;
	@Input() foldersList: Array<any>;
	// Accordion Config
	@Input() closeOthers = false;
	@Input() showArrows = true;

	@Input() isChildComponent = false;
	curLevelList = [];
	// Content template
	@ContentChild(TemplateRef) templateRef: TemplateRef<any>;

	constructor(private _smartFoldersService: SmartFoldersService) { }

	ngDoCheck() {
		this.foldersList && this.updateFolders();
	}

	updateFolders() {
		this.curLevelList = [];

		this.foldersList.forEach((folderId) => {
			if (this.isChildComponent || !this.foldersData[folderId].parentFolder) {
				this.curLevelList.push(folderId);
			}
		});
	}

	onEditFolder(folderId) {
		this.onSelectFolder(folderId);
		this._smartFoldersService.editSelectedFolder.next();
	}

	onDeleteFolder(folderId) {
		this.onSelectFolder(folderId);
		this._smartFoldersService.deleteSelectedFolder.next();
	}

	onSelectFolder(folderId) {
		this._smartFoldersService.selectFolder.next(folderId);
	}
}
