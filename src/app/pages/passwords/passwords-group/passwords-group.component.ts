import { Component, DoCheck, Input, OnInit } from '@angular/core';

import { PasswordCategory } from '../../../shared/_models/password-category.model';
import { SmartFoldersService } from '../../../components/smart-folders/smart-folders.service';

@Component({
	selector: 'app-passwords-group',
	templateUrl: './passwords-group.component.html',
	styleUrls: ['./passwords-group.component.scss']
})
export class PasswordsGroupComponent implements OnInit, DoCheck {
	@Input() foldersData: { [name: string]: PasswordCategory };
	@Input() foldersList: Array<any>;
	@Input() isChildComponent = false;
	curLevelList = [];

	constructor(private _smartFoldersService: SmartFoldersService) {
	}

	ngOnInit() {
		// this._smartListService.viewTypeChanged
		//   .subscribe(
		//     (type: string) => {
		//       this.activeViewType = type;
		//     }
		//   );
	}

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
