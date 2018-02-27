import {
	Component, ContentChild, Input, OnDestroy, OnInit, Output, TemplateRef,
	ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { SmartFolderModel } from './smart-folder.model';
import { SmartFoldersService } from './smart-folders.service';

@Component( {
	selector: 'smart-folders',
	templateUrl: './smart-folders.component.html',
	styleUrls: ['./smart-folders.component.scss'],
	providers: [SmartFoldersService],
	encapsulation: ViewEncapsulation.None
} )

export class SmartFoldersComponent implements OnInit, OnDestroy {
	// Data
	@Input() foldersData: {[name: string]: SmartFolderModel};
	@Input() foldersList: Array<string>;

	// Accordion config
	@Input() closeOthers = false;
	@Input() showArrows = true;
	@Input() expandAll = false;

	// Events
	@Input() selectedFolder: string;
	@Output() selectedFolderChange = new Subject<string>();

	@Output() onEditFolder = new Subject();
	@Output() onDeleteFolder = new Subject();

	// Content template
	@ContentChild(TemplateRef) templateRef: TemplateRef<any>;

	subscriptions: Array<Subscription> = [];

	constructor(private _smartFoldersService: SmartFoldersService) {}

	ngOnInit() {
		this.subscriptions.push( this._smartFoldersService.selectFolder.subscribe( value => this.selectedFolderChange.next(value)) );

		this.subscriptions.push( this._smartFoldersService.editSelectedFolder.subscribe( value => this.onEditFolder.next(value)) );

		this.subscriptions.push( this._smartFoldersService.deleteSelectedFolder.subscribe( value => this.onDeleteFolder.next(value)) );
	}

	ngOnDestroy() {
		this.subscriptions.forEach( ( subscription: Subscription ) => {
			subscription.unsubscribe();
		} );
	}

	// Accordion actions
	openFolders() {
		this.toggleFolders(true);
	}
	closeFolders() {
		this.toggleFolders(false);
	}
	toggleFolders(state) {
		this._smartFoldersService.toggleFolders.next(state);
	}
}
