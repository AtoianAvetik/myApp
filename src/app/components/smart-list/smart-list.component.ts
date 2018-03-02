import { Component, ContentChild, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { SmartListService } from './smart-list.service';
import { DEFAULT_SMART_LIST_OPTIONS, SMART_LIST_VIEW_TYPES } from './smart-list.config';

@Component( {
	selector: 'smart-list',
	templateUrl: './smart-list.component.html',
	styleUrls: ['./smart-list.component.scss'],
	providers: [SmartListService]
} )
export class SmartListComponent implements OnInit, OnDestroy {
	@Input() list: any;
	@Input() listId: string;

	// options
	@Input() options;
	@Input() viewType: string = SMART_LIST_VIEW_TYPES.list;
	@Input() viewTypeChange = new Subject<string>();
	@Input() imageSizeChange = new Subject<string>();
	@Input() cellSizeChange = new Subject<string>();

	@Input() selectedList: string;
	@Output() selectedListChange = new Subject<string>();
	@Input() selectedItem: number;
	@Output() selectedItemChange = new Subject<number>();

	@Output() onEditItem = new Subject();
	@Output() onDeleteItem = new Subject();

	@ContentChild(TemplateRef) templateRef: TemplateRef<any>;
	subscriptions: Array<Subscription> = [];

	constructor(private _smartListService: SmartListService) {}

	ngOnInit() {
		// Assign default option if options not defined
		this.options = Object.assign({}, DEFAULT_SMART_LIST_OPTIONS, this.options );

		// Subscribe events for update states
		this.subscriptions.push( this._smartListService.selectList.subscribe( value => this.selectedListChange.next(value)) );

		this.subscriptions.push( this._smartListService.selectItem.subscribe( value => this.selectedItemChange.next(value)) );

		this.subscriptions.push( this._smartListService.editSelectedItem.subscribe( value => this.onEditItem.next(value)) );

		this.subscriptions.push( this._smartListService.deleteSelectedItem.subscribe( value => this.onDeleteItem.next(value)) );

		// Subscribe events for update options
		this.subscriptions.push( this.viewTypeChange.subscribe( value => this.viewType = value) );

		this.subscriptions.push( this.imageSizeChange.subscribe( value => this.options.imgSize = value) );

		this.subscriptions.push( this.cellSizeChange.subscribe( value => this.options.cellSize = value) );
	}

	ngOnDestroy() {
		this.subscriptions.forEach( ( subscription: Subscription ) => {
			subscription.unsubscribe();
		} );
	}
}
