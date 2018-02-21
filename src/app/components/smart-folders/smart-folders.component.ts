import { Component, ContentChild, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { SmartFolderModel } from './smart-folder.model';
import { SmartFoldersService } from './smart-folders.service';

@Component( {
	selector: 'smart-folders',
	templateUrl: './smart-folders.component.html',
	styleUrls: ['./smart-folders.component.scss'],
	providers: [SmartFoldersService]
} )

export class SmartFoldersComponent implements OnInit, OnDestroy {
	@Input() foldersData: {[name: string]: SmartFolderModel};
	@Input() foldersList: Array<string>;
	@Output() onSelectFolder = new Subject<string>();
	@Output() onEditFolder = new Subject();
	@Output() onDeleteFolder = new Subject();
	@ContentChild(TemplateRef) templateRef: TemplateRef<any>;
	subscriptions: Array<Subscription> = [];

	constructor(private _smartFoldersService: SmartFoldersService) { }

	ngOnInit() {
		this.subscriptions.push( this._smartFoldersService.selectFolder
			.subscribe( (value) => {
				this.onSelectFolder.next(value);
			})
		);

		this.subscriptions.push( this._smartFoldersService.editSelectedFolder
			.subscribe( (value) => {
				this.onEditFolder.next(value);
			})
		);

		this.subscriptions.push( this._smartFoldersService.deleteSelectedFolder
			.subscribe( (value) => {
				this.onDeleteFolder.next(value);
			})
		);
	}

	ngOnDestroy() {
		this.subscriptions.forEach( ( subscription: Subscription ) => {
			subscription.unsubscribe();
		} );
	}
}
