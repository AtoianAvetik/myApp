import { Component, ContentChild, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { SmartListService } from './smart-list.service';

@Component( {
	selector: 'smart-list',
	templateUrl: './smart-list.component.html',
	styleUrls: ['./smart-list.component.scss'],
	providers: [SmartListService]
} )
export class SmartListComponent implements OnInit, OnDestroy {
	@Input() list: any;
	@Input() listId: string;

	@Input() viewType: string = 'list';
	@Input() viewTypeChange = new Subject<string>();

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
		this.subscriptions.push( this._smartListService.selectList.subscribe( value => this.selectedListChange.next(value)) );

		this.subscriptions.push( this._smartListService.selectItem.subscribe( value => this.selectedItemChange.next(value)) );

		this.subscriptions.push( this._smartListService.editSelectedItem.subscribe( value => this.onEditItem.next(value)) );

		this.subscriptions.push( this._smartListService.deleteSelectedItem.subscribe( value => this.onDeleteItem.next(value)) );

		this.subscriptions.push( this.viewTypeChange.subscribe( value => this.viewType = value) );
	}

	ngOnDestroy() {
		this.subscriptions.forEach( ( subscription: Subscription ) => {
			subscription.unsubscribe();
		} );
	}
}
