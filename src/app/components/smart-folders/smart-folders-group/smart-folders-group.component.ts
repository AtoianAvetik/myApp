import { Component, ContentChild, DoCheck, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { SmartFoldersService } from '../smart-folders.service';
import { Subscription } from 'rxjs/Subscription';

@Component( {
	selector: 'smart-folders-group',
	templateUrl: './smart-folders-group.component.html',
	styleUrls: ['./smart-folders-group.component.scss']
} )

export class SmartFoldersGroupComponent implements DoCheck, OnInit, OnDestroy {
	// Data
	@Input() foldersData: Object;
	@Input() foldersList: Array<any>;

	// Accordion Config
	@Input() closeOthers = false;
	@Input() showArrows = true;
	@Input() expandAll = false;

	// Accordion ref
	@ViewChild('acc') accordionRef;

	// Content template
	@ContentChild(TemplateRef) templateRef: TemplateRef<any>;

	@Input() isChildComponent = false;
	curLevelList = [];
	subscriptions: Array<Subscription> = [];

	constructor(private _smartFoldersService: SmartFoldersService) {}

	ngOnInit() {
		this.subscriptions.push( this._smartFoldersService.toggleFolders
			.subscribe( state => this.accordionRef.toggleAll(state) )
		);
	}

	ngDoCheck() {
		this.foldersList && this.updateFolders();
	}

	ngOnDestroy() {
		this.subscriptions.forEach( ( subscription: Subscription ) => {
			subscription.unsubscribe();
		} );
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
