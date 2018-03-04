import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../../shared/_services/data.service';
import { UniqueID } from '../../shared/_services/unique-id.service';

import { SmartFolderModel } from '../../components/smart-folders/smart-folder.model';

@Component({
	selector: 'app-folder',
	templateUrl: './folder.component.html',
	styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit, OnChanges {
	@Input() mode: string = 'add';
	@Input() folderId: any = null;
	@Input() foldersData: any = {};
	@Input() folders: Array<any> = [];
	private isTransfer = false;
	private formDefaultValues = {
		folderName: '',
		folderSelect: null
	};
	curFoldersList: Array<any> = [];
	activeFolder: any = [];
	form: FormGroup;

	constructor(private _dataService: DataService, private _uniqueID: UniqueID ) {
	}

	initForm() {
		this.form = new FormGroup({
			'folderName': new FormControl(this.formDefaultValues.folderName, Validators.required),
			'folderSelect': new FormControl(this.formDefaultValues.folderSelect)
		});
	}

	updateForm() {
		// check if foldersData is defined
		if (!Object.getOwnPropertyNames(this.foldersData).length ) {
			return false;
		}
		this.form.reset();
		this.curFoldersList = this.folders.slice();

		const updatedValues = JSON.parse(JSON.stringify(this.formDefaultValues));

		if (this.mode === 'edit' && this.foldersData[this.folderId]) {
			this.curFoldersList = this.folders.filter((folder) => {
				if (folder.id === this.folderId || this.foldersData[this.folderId].parentFolder === folder.id) {
					return false;
				} else if (this.foldersData[folder.id].parentFolder) {
					return checkParent(this.foldersData, this.folderId, folder.id);
				} else {
					return true;
				}
			});

			const parentFolder = this.foldersData[this.folderId].parentFolder;
			this.activeFolder = parentFolder ? [this.folders.find((el, index) => el.id === parentFolder)] : null;

			const folder = this.foldersData[this.folderId];
			updatedValues.folderName = folder.name;
			updatedValues.folderSelect = this.activeFolder;
		}

		this.form.setValue(updatedValues);

		function checkParent(data, selectedId, curId) {
			if (data[curId].parentFolder === selectedId) {
				return false;
			} else {
				if (data[data[curId].parentFolder].parentFolder) {
					return checkParent(data, selectedId, data[curId].parentFolder);
				} else {
					return true;
				}
			}
		}
	}

	ngOnInit() {
		// this.initForm();
	}

	ngOnChanges() {
		this.updateForm();
	}

	onSelectFolder(data) {
		let formControl: FormControl;
		formControl = <FormControl>this.form.get('folderSelect');

		if (this.mode === 'edit') {
			this.isTransfer = true;
		}
		if (data.id === this.folderId) {
			this.isTransfer = false;
		}

		formControl.markAsDirty();
		formControl.setValue(data);
	}

	isValid(ctrl?: string) {
		return ctrl ? this.get(ctrl).valid : this.form.valid;
	}

	isDirty(ctrl?: string) {
		return ctrl ? this.get(ctrl).dirty : this.form.dirty;
	}

	get(ctrl: string) {
		return this.form.get(ctrl);
	}

	resetForm() {
		this.activeFolder = [];
		this.isTransfer = false;
		this.curFoldersList = [];

		this.form.reset();
		this.updateForm();
	}


	onSubmit(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (this.form.valid) {
				const parentFolder = this.form.get('folderSelect').value ? this.form.get('folderSelect').value.id : '';
				const folderName = this.form.get('folderName').value.toString();
				if (this.mode === 'add') {
					const folder = new SmartFolderModel('', folderName, parentFolder);
					folder.id = 'cg-' + this._uniqueID.UUID();
					this._dataService.passwordsAction('addFolder', folder).then(_ => resolve()).catch((error) => reject(error));
				} else if (this.mode === 'edit') {
					const folder = this.foldersData[this.folderId];
					folder.name = folderName;
					if (this.isTransfer) {
						this._dataService.passwordsAction('transferFolder', folder, parentFolder).then(_ => resolve()).catch((error) => reject(error));
					} else {
						this._dataService.passwordsAction('editFolder', folder).then(_ => resolve()).catch((error) => reject(error));
					}
				} else {
					reject('mode was not set');
				}

			} else {
				reject('form is not valid');
			}
		});
	}
}
