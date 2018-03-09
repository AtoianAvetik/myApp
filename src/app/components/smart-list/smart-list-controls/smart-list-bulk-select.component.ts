import { Component, Input, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { SmartListControlsService } from '../smart-list-controls.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'smart-list-bulk-select',
	template: `		

		<div *ngIf="counter > 0" class="smart-list_bulk-select" (click)="$event.stopPropagation()">
			<mat-menu #rootMenu="matMenu" yPosition="below" [overlapTrigger]="false" xPosition="after">
				<button mat-menu-item (click)="deleteSelectedItems.next(selectedItems);$event.stopPropagation()">Delete</button>
				<button mat-menu-item [matMenuTriggerFor]="transferMenu" *ngIf="transferList.length">Transfer to folder</button>
			</mat-menu>
	
			<mat-menu #transferMenu="matMenu">
				<button
					mat-menu-item
					*ngFor="let list of transferList"
					(click)="this.transferSelectedItems.next({data: selectedItems, listId: list.id})"
				>{{ list.text }}</button>
			</mat-menu>
			
			<p>{{ counter }} selected</p>
			<button mat-icon-button [matMenuTriggerFor]="rootMenu">
				<button class="btn-grey-card btn-darken-2 btn">Actions</button>
				<div class="mat-button-ripple mat-ripple mat-button-ripple-round" matripple=""></div>
			</button>
		</div>
		
	`
})

export class SmartListBulkSelectComponent implements OnDestroy {
	@Input() lists: Array<string> = [];
	@Input() transferList: Array<{id: string, text: string}> = [];

	// Actions
	@Output() deleteSelectedItems = new Subject<Array<any>>();
	@Output() transferSelectedItems = new Subject<{data: Array<any>, listId: string}>();

	public counter: number = 0;

	private _selectedItems: Array<any> = [];
	@Output() selectedItemsChange = new Subject<Array<any>>();
	@Input()
	get selectedItems() {
		return this._selectedItems;
	}
	set selectedItems(val) {
		this._selectedItems = val;
		this.selectedItemsChange.next(this._selectedItems);
	}

	subscriptions: Array<Subscription> = [];

	constructor(private _slcs: SmartListControlsService ) {
		this.subscriptions.push( this._slcs.selectItem.subscribe( item => this.checkList(this.lists, item) ) );
		this.subscriptions.push( this._slcs.deselectItem.subscribe( item => this.checkList(this.lists, item) ) );
		this.subscriptions.push( this._slcs.deselectAll.subscribe(_ => {
			this.counter = 0;
			this.selectedItems = [];
		}) );
	}

	checkList(lists, item) {
		lists.forEach(id => {
			if ( id === item.listId ) {
				item.isSelected ? this.addToSelected(this.selectedItems, item) : this.removeFromSelected(this.selectedItems, item);
			}
		});
	}

	increment() {
		this.counter += 1;
	}

	decrement() {
		this.counter -= 1;
	}

	addToSelected(array, item) {
		array.push(item);
		this.increment();
	}

	removeFromSelected(array, item) {
		const index: number = array.findIndex(i => (i.listId === item.listId && i.id === item.id));
		if (index !== -1) {
			array.splice(index, 1);
			this.decrement();
		}
	}

	ngOnDestroy() {
		this.subscriptions.forEach( ( subscription: Subscription ) => {
			subscription.unsubscribe();
		} );
	}
}
