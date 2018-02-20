import { Component, ContentChild, DoCheck, Input, TemplateRef } from '@angular/core';

import { SmartFoldersService } from '../smart-folders.service';

@Component( {
	selector: 'smart-folders-group',
	templateUrl: './smart-folders-group.component.html',
	styleUrls: ['./smart-folders-group.component.scss']
} )

export class SmartFoldersGroupComponent implements DoCheck {
	@Input() foldersData: Object;
	@Input() foldersList: Array<any>;
	@Input() isChildComponent = false;
	curLevelList = [];
	@ContentChild(TemplateRef) templateRef: TemplateRef<any>;

	constructor(private _smartFoldersService: SmartFoldersService) { }

	ngDoCheck() {
		this.foldersList && this.updateFolders();
	}

	updateFolders() {
		this.curLevelList = [];

		this.foldersList.forEach((folderId) => {
			if (this.isChildComponent || !this.foldersData[folderId].parentCategory) {
				this.curLevelList.push(folderId);
			}
		});
	}

	onEditFolder(folderId) {
		this.selectFolder(folderId);
		this._smartFoldersService.editSelectedFolder.next();
	}

	onDeleteFolder(folderId) {
		this.selectFolder(folderId);
		this._smartFoldersService.deleteSelectedFolder.next();
	}

	selectFolder(folderId) {
		this._smartFoldersService.folderSelected.next(folderId);
	}
}
