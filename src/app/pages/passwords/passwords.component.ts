import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { SmartFolderModel } from '../../components/smart-folders/smart-folder.model';
import { AddMenuItem } from '../../components/add-menu/add-menu-item.model';
import { SMART_LIST_VIEW_TYPES } from '../../components/smart-list/smart-list.config';

import { DataService } from '../../shared/_services/data.service';
import { ModalService } from '../../components/modals/modal.service';
import { LoaderService } from '../../components/loader/loader.service';
import { NotificationService } from '../../components/notifications/notification.service';

@Component( {
	selector: 'app-passwords',
	templateUrl: './passwords.component.html',
	styleUrls: ['./passwords.component.scss']
} )
export class PasswordsComponent implements OnInit, AfterViewInit {
	// get child components
	@ViewChild( 'folderForm' ) folderFormCmp;
	@ViewChild( 'passwordForm' ) passwordFormCmp;
	@ViewChild( 'searchImageForm' ) searchImageFormCmp;

	// passwords data
	foldersData: { [name: string]: SmartFolderModel };
	folders: Array<any>;
	foldersIdArray: Array<any>;

	// mods
	passwordMode = '';
	folderMode = '';
	deleteMode = '';

	// loaders-page
	folderFormLoader;
	passwordFormLoader;
	deleteFormLoader;

	// add menu
	addMenuItemsArray: Array<AddMenuItem>;

	// smart folders
	expandAllFolders = true;

	// smart list
	activeViewType = 'tile';
	activeViewTypeChange = new Subject<string>();
	viewTypes = SMART_LIST_VIEW_TYPES;

	// states
	passwordsLength: number = 0;
	listSelectedId: number;
	listItemSelectedIndex: number;

	constructor( private dataService: DataService,
	             private modalService: ModalService,
	             private loaderService: LoaderService,
	             private notificationService: NotificationService ) {
	}

	ngOnInit() {
		this.initForms();
		this.dataService.getPasswords
			.subscribe(
				( data ) => {
					this.updatePasswords( data );
				}
			);
		this.modalService.modalClosingDidDone
			.subscribe(
				() => {
					if ( !this.modalService.activeModals.length ) {
						this.resetForms();
						this.folderFormLoader.dismiss();
						this.passwordFormLoader.dismiss();
						this.deleteFormLoader.dismiss();
					}
				}
			);
		this.addMenuItemsArray = [
			{ id: 'item-modal', name: 'Add password', icon: 'ft-file-plus' },
			{ id: 'folder-modal', name: 'Add folder', icon: 'ft-folder' }
		];
	}

	ngAfterViewInit() {
		this.createLoaders();
	}

	createLoaders() {
		this.folderFormLoader = this.loaderService.create( {
			id: 'folderForm'
		} );
		this.passwordFormLoader = this.loaderService.create( {
			id: 'passwordForm'
		} );
		this.deleteFormLoader = this.loaderService.create( {
			id: 'deleteForm'
		} );
	}

	updatePasswords( data: any ) {
		this.foldersData = data.categories;
		this.folders = data.categoriesSelectArray;
		this.foldersIdArray = data.categoriesIdArray;

		this.passwordsLength = 0;
		this.foldersIdArray.forEach( ( id ) => this.passwordsLength = this.foldersData[id].content.length + this.passwordsLength );
	}

	initForms() {
		this.passwordFormCmp.initForm();
		this.folderFormCmp.initForm();
		this.searchImageFormCmp.initForm();
	}

	resetForms() {
		this.folderMode = '';
		this.passwordMode = '';
		this.deleteMode = '';

		this.passwordFormCmp.resetForm();
		this.folderFormCmp.resetForm();
		this.searchImageFormCmp.resetForm();
	}

	addMenuClicked( data ) {
		const id = data.id;
		this.passwordMode = 'add';
		this.folderMode = 'add';
		this.modalService.modalWillOpened.next( id );
	}

	selectImage() {
		this.passwordFormCmp.uploadImage( this.searchImageFormCmp.getSelectedImage() )
	}

	deleteFormSubmit() {
		const sub = this.deleteFormLoader.present().subscribe(
			() => {
				sub.unsubscribe();
				switch ( this.deleteMode ) {
					case 'folder':
						this.dataService.passwordsAction( 'deleteCategory', this.foldersData[this.listSelectedId] ).then( () => {
							const message = 'Folder was deleted!';
							this.modalService.closeAll();
							this.notificationService.success( message );
							this.deleteFormLoader.dismiss();
						} ).catch( ( error ) => {
							const message = 'Folder was not deleted!'
							this.deleteFormLoader.dismiss();
							this.notificationService.error( message, 0 );
							console.error( error )
						} );
						break;
					case 'password':
						this.dataService.passwordsAction( 'deleteItem', this.listSelectedId, this.listItemSelectedIndex ).then( () => {
							const message = 'Password was deleted!';
							this.modalService.closeAll();
							this.notificationService.success( message );
							this.deleteFormLoader.dismiss();
						} ).catch( ( error ) => {
							const message = 'Password was not deleted!';
							this.deleteFormLoader.dismiss();
							this.notificationService.error( message, 0 );
							console.error( error )
						} );
						break;
				}
			}
		);
	}

	folderFormSubmit() {
		const sub = this.folderFormLoader.present().subscribe(
			() => {
				sub.unsubscribe();
				this.folderFormCmp.onSubmit().then( () => {
					const message = this.folderMode === 'add' ? 'Folder was added!' : 'Folder was changed!';
					this.modalService.modalWillClosed.next( 'folder-modal' );
					this.notificationService.success( message );
					this.folderFormLoader.dismiss();
				} ).catch( ( error ) => {
					const message = this.folderMode === 'add' ? 'Folder was not added!' : 'Folder was not changed!';
					this.folderFormLoader.dismiss();
					this.notificationService.error( message, 0 );
					console.error( error )
				} );
			}
		);
	}

	passwordFormSubmit() {
		const sub = this.passwordFormLoader.present().subscribe(
			() => {
				sub.unsubscribe();
				this.passwordFormCmp.onSubmit().then( () => {
					const message = this.folderMode === 'add' ? 'Password was added!' : 'Password was changed!';
					this.modalService.modalWillClosed.next( 'item-modal' );
					this.notificationService.success( message );
					this.passwordFormLoader.dismiss();
				} ).catch( ( error ) => {
					const message = this.folderMode === 'add' ? 'Password was not added!' : 'Password was not changed!';
					this.passwordFormLoader.dismiss();
					this.notificationService.error( message, 0 );
					console.error( error )
				} );
			}
		);
	}

	logger( text, event ) {
		console.log( text + ": " + event );
	}
}
