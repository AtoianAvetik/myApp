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
	@Output() selectList = new Subject<string>();
	@Output() selectItem = new Subject<number>();
	@Output() editItem = new Subject();
	@Output() deleteItem = new Subject();
	@ContentChild(TemplateRef) templateRef: TemplateRef<any>;
	listClass = 'smart-list -';
	subscriptions: Array<Subscription> = [];

	constructor(private _smartListService: SmartListService) {}

	ngOnInit() {
		this.listClass = this.listClass + this.viewType;

		this.subscriptions.push( this._smartListService.selectList
			.subscribe( (value) => {
				this.selectList.next(value);
			})
		);

		this.subscriptions.push( this._smartListService.selectItem
			.subscribe( (value) => {
				this.selectItem.next(value);
			})
		);

		this.subscriptions.push( this._smartListService.editSelectedItem
			.subscribe( (value) => {
				this.editItem.next(value);
			})
		);

		this.subscriptions.push( this._smartListService.deleteSelectedItem
			.subscribe( (value) => {
				this.deleteItem.next(value);
			})
		);
	}

	ngOnDestroy() {
		this.subscriptions.forEach( ( subscription: Subscription ) => {
			subscription.unsubscribe();
		} );
	}
}
