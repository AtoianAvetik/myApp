import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ValidatorsService } from '../../shared/_services/validators.service';
import { DataService } from '../../shared/_services/data.service';
import { ImgToBase64Service } from '../../shared/_services/img-to-base64.service';
import { LoaderService } from '../../components/loader/loader.service';
import { UniqueID } from '../../shared/_services/unique-id.service';

import { SmartFolderModel } from '../../components/smart-folders/smart-folder.model';
import { Password } from '../../shared/_models/password.model';

@Component({
	selector: 'app-password',
	templateUrl: './password.component.html',
	styleUrls: ['./password.component.scss'],
	providers: [ImgToBase64Service]
})
export class PasswordComponent implements OnInit, OnChanges, AfterViewInit {
	@Input() mode: string = 'add';
	@Input() itemId: string = null;
	@Input() folderId: any = null;
	@Input() foldersSelect: any = [];
	@Input() foldersData: any = {};
	itemIndex: number;
	folder: any;
	form: FormGroup = null;
	private isTransfer = false;
	private formDefaultValues = {
		serviceName: '',
		url: '',
		userName: '',
		email: '',
		pass: '',
		desc: '',
		folderSelect: {id: 'none', text: '(none)'},
		previewImage: {
			image: '',
			lastImage: '',
			uploadImage: null,
		}
	};
	activeFolder: any = [];
	previewImageLoader;
	passwordFormLoader;

	constructor(private _validatorsService: ValidatorsService,
				private _dataService: DataService,
				private _loaderService: LoaderService,
				private _uniqueID: UniqueID,
				private _imgToBase64: ImgToBase64Service) {
	}

	initForm() {
		this.form = new FormGroup({
			'serviceName': new FormControl(this.formDefaultValues.serviceName, Validators.required),
			'url': new FormControl(this.formDefaultValues.url, [Validators.required, this._validatorsService.url.bind(this._validatorsService)]),
			'userName': new FormControl(this.formDefaultValues.userName, Validators.required),
			'email': new FormControl(this.formDefaultValues.email, [Validators.required, this._validatorsService.email.bind(this._validatorsService)]),
			'pass': new FormControl(this.formDefaultValues.pass, Validators.required),
			'desc': new FormControl(this.formDefaultValues.desc),
			'folderSelect': new FormControl(this.formDefaultValues.folderSelect, Validators.required),
			'previewImage': new FormGroup({
				'image': new FormControl(this.formDefaultValues.previewImage.image),
				'lastImage': new FormControl(this.formDefaultValues.previewImage.lastImage),
				'uploadImage': new FormControl(this.formDefaultValues.previewImage.uploadImage),
			})
		});
	}

	updateForm() {
		if (!Object.getOwnPropertyNames(this.foldersData).length) {
			return false;
		}

		this.form.reset();

		const updatedValues = JSON.parse(JSON.stringify(this.formDefaultValues));

		if ( this.folderId ) {
			this.folder = this.foldersData[this.folderId];
			this.itemIndex = this.getItemById(this.folder.content, this.itemId);
		}

		if (this.mode === 'edit' && this.folder && this.folder.content[this.itemIndex]) {
			this.folder.editable ? (this.activeFolder = [this.foldersSelect.find((el, index) => el.id === this.folderId)]) : (this.activeFolder = [this.formDefaultValues.folderSelect]);

			const password = this.folder.content[this.itemIndex];
			updatedValues.serviceName = password.serviceName;
			updatedValues.url = password.url;
			updatedValues.userName = password.userName;
			updatedValues.email = password.email;
			updatedValues.pass = password.pass;
			updatedValues.desc = password.desc;
			updatedValues.folderSelect = this.activeFolder;
			updatedValues.previewImage.image = password.img;
			updatedValues.previewImage.lastImage = password.img;
		}

		this.form.setValue(updatedValues);
	}


	ngOnInit() {
		// this.initForm();

		this._imgToBase64.converted
			.subscribe(
				(image: string) => {
					this.previewImageLoader.dismiss();
					this.setPreviewImage(image);
				}
			);
	}

	ngAfterViewInit() {
		this.previewImageLoader = this._loaderService.create({
			id: 'previewImage'
		});
		this.passwordFormLoader = this._loaderService.create({
			id: 'passwordForm'
		});
	}

	ngOnChanges() {
		this.updateForm();
	}

	uploadImage(image) {
		const subImage = this.previewImageLoader.present().subscribe(
			() => {
				this._imgToBase64.convert(image);
				subImage.unsubscribe();
			}
		);
	}

	setPreviewImage(image) {
		let formControl: FormControl;
		formControl = <FormControl>this.form.get('previewImage.image');

		formControl.setValue(image);
		formControl.markAsTouched();
		formControl.markAsDirty();
	}

	revertImage(e) {
		e.stopPropagation();
		let imageFormControl: FormControl;
		let uploadFormControl: FormControl;
		imageFormControl = <FormControl>this.form.get('previewImage.image');
		uploadFormControl = <FormControl>this.form.get('previewImage.uploadImage');

		imageFormControl.setValue(this.form.get('previewImage.lastImage').value);
		uploadFormControl.setValue(this.formDefaultValues.previewImage.uploadImage);
		imageFormControl.markAsUntouched();
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
		this.mode = '';

		this.form.reset();
		this.updateForm();
	}

	onSubmit(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (this.form.valid) {
				const parentFolderId = this.form.get('folderSelect').value.id;
				const parentFolderName = this.form.get('folderSelect').value.text;
				const newPassword = new Password(
					'',
					this.form.get('serviceName').value,
					this.form.get('userName').value,
					this.form.get('email').value,
					this.form.get('pass').value,
					this.form.get('url').value,
					this.form.get('desc').value,
					this.form.get('previewImage.image').value
				);

				if (this.mode === 'add') {
					newPassword.id = 'pass-' + this._uniqueID.UUID();
					if (!this.foldersData[parentFolderId]) {
						const folder = new SmartFolderModel(parentFolderId, parentFolderName);
						this._dataService.passwordsAction('addCategory', folder).then(() => {
							this._dataService.passwordsAction('addItem', parentFolderId, newPassword).then(() => resolve()).catch((error) => reject(error));
						}).catch((error) => reject(error));
					} else {
						this._dataService.passwordsAction('addItem', parentFolderId, newPassword).then(() => resolve()).catch((error) => reject(error));
					}
				} else if (this.mode === 'edit') {
					newPassword.id = this.folder.content[this.itemIndex].id;
					if (this.isTransfer) {
						this._dataService.passwordsAction('transferItem', this.folderId, parentFolderId, newPassword).then(() => resolve()).catch((error) => reject(error));
					} else {
						this._dataService.passwordsAction('editItem', this.folderId, newPassword).then(() => resolve()).catch((error) => reject(error));
					}
				} else {
					reject('mode was not set');
				}

			} else {
				reject('form is not valid');
			}
		});
	}

	getItemById(array, id) {
		return array.map(function (el) {
			return el.id;
		}).indexOf(id);
	}
}
