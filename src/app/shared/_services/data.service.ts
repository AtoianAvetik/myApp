import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { SmartFolderModel } from '../../components/smart-folders/smart-folder.model';

import { ApiService } from './api.service';

interface Passwords {
	[name: string]: SmartFolderModel
}

interface PasswordsData {
	folders: { [name: string]: SmartFolderModel };
	foldersSelectArray: { id: string, text: string }[] ;
	foldersIdArray: string[];
}

@Injectable()
export class DataService {
	private actions = {
		'addItem': this.addItem.bind(this),
		'editItem': this.editItem.bind(this),
		'transferItem': this.transferItem.bind(this),
		'deleteItem': this.deleteItem.bind(this),
		'addFolder': this.addFolder.bind(this),
		'editFolder': this.editFolder.bind(this),
		'transferFolder': this.transferFolder.bind(this),
		'deleteFolder': this.deleteFolder.bind(this)
	};
	private passwordsData: PasswordsData = {
		folders: {},
		foldersSelectArray: [],
		foldersIdArray: [],
	};
	private tablesData = [
		{
			id: 'table1',
			title: 'Table 1',
			headers: {
				col1: 'Column 1',
				col2: 'Column 2',
				col3: 'Column 3',
				col4: 'Column 4'
			},
			content: [
				{
					col1: 'Cell 1',
					col2: 'Cell 2',
					col3: 'Cell 3',
					col4: 'Cell 4',
				},
				{
					col1: 'Cell 5',
					col2: 'Cell 6',
					col3: 'Cell 7',
					col4: 'Cell 8',
				}
			]
		},
		{
			id: 'table2',
			title: 'Table 2',
			headers: {
				col1: 'Column 1',
				col2: 'Column 2',
				col3: 'Column 3',
				col4: 'Column 4'
			},
			content: [
				{
					col1: 'Cell 9',
					col2: 'Cell 10',
					col3: 'Cell 11',
					col4: 'Cell 12',
				},
				{
					col1: 'Cell 13',
					col2: 'Cell 14',
					col3: 'Cell 15',
					col4: 'Cell 16',
				}
			]
		}
	];
	private _passwords: BehaviorSubject<PasswordsData> = new BehaviorSubject({
		folders: this.passwordsData.folders,
		foldersSelectArray: this.passwordsData.foldersSelectArray,
		foldersIdArray: this.passwordsData.foldersIdArray
	});
	public readonly passwords: Observable<PasswordsData> = this._passwords.asObservable();

	constructor(private apiService: ApiService) {
		this.loadInitialData();
	}

	get getPasswords() {
		return this.passwords;
	}

	loadInitialData() {
		this.apiService.get('/passwords.json')
			.subscribe(
				res => {
					const resData = (<Passwords>res);
					this.updatePasswords(resData.folders || {});
				},
				err => console.error("Error retrieving passwords!")
			);
	}

	getTablesData() {
		return this.tablesData;
	}

	passwordsAction(action: string, option1, option2?, option3?, option4?): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.passwords.subscribe(() => {
				resolve();
			}, (error) => {
				reject(error);
			});

			this.actions[action](this.passwordsData.folders || {}, option1, option2, option3, option4);
			this.updatePasswords(this.passwordsData.folders || {});
		});
	}

	private updatePasswords(folders) {
		this.passwordsData = this.updateFolders(folders);
		this._passwords.next(this.passwordsData);
	}

	// common actions
	private addItem(folders, folderId, item) {
		folders[folderId].content.push(item);
	}

	private editItem(folders, folderId, item) {
		folders[folderId].content[this.getIndexById(folders[folderId].content, item.id)] = item;
	}

	private transferItem(folders, prevFolderId, folderId, item) {
		this.removeFromArray(folders[prevFolderId].content, item.id, true);
		folders[folderId].content.push(item);
	}

	private deleteItem(folders, folderId, itemId) {
		this.removeFromArray(folders[folderId].content, itemId, true);
	}

	private addFolder(folders, folder: SmartFolderModel) {
		folders[folder.id] = folder;
		if (folder.parentFolder) {
			folders[folder.parentFolder].childFolders.push(folder.id);
		}
	}

	private deleteFolder(folders, folder, isChild = false) {
		if (folder.parentFolder && !isChild) {
			this.removeFromArray(folders[folder.parentFolder].childFolders, folder.id);
		}
		if (folder.childFolders.length) {
			folder.childFolders.forEach((id) => {
				this.deleteFolder(folders, folders[id], true)
			});
		}
		delete folders[folder.id];
	}

	private editFolder(folders, folder) {
		folders[folder.id] = folder;
	}

	private transferFolder(folders, folder, folderId) {
		const parentFolder = folders[folder.id].parentFolder;
		parentFolder && this.removeFromArray(folders[parentFolder].childFolders, folder.id);
		folders[folder.id].parentFolder = folderId;
		if (folderId) {
			folders[folderId].childFolders.push(folder.id);
		}
	}

	private updateFolders(folders) {
		let folderName;
		const foldersSelectArray = [];
		const foldersIdArray = [];

		for (const folder in folders) {
			if (folders.hasOwnProperty(folder)) {
				const curFolder = folders[folder];
				const folderId = curFolder.id;
				folderName = curFolder.name;
				setHierarchicalFolderName(curFolder);
				curFolder.editable && foldersSelectArray.push({id: folderId, text: folderName});
				foldersIdArray.push(folderId);
			}
		}

		return { folders, foldersSelectArray, foldersIdArray };

		function setHierarchicalFolderName(folder) {
			if (folder.parentFolder) {
				folderName = folders[folder.parentFolder].name + '/' + folderName;
				if (folders[folder.parentFolder].parentFolder) {
					setHierarchicalFolderName(folders[folder.parentFolder]);
				}
			}
		}
	}

	removeFromArray(array, val, byID = false) {
		const index:number = byID ? this.getIndexById(array, val) : array.indexOf(val);
		if (index !== -1) {
			array.splice(index, 1);
		}
	}

	getIndexById(array, id) {
		return array.findIndex(function (el) {
			return el.id === id;
		})
	}
}
