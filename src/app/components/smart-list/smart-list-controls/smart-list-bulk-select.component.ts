import { Component, Input, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { SmartListControlsService } from '../smart-list-controls.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'smart-list-bulk-select',
	template: `
		<div ngbDropdown class="smart-list_bulk-select" *ngIf="counter > 0" (click)="$event.stopPropagation()">
			<p>{{ counter }} selected</p>
			<button class="btn btn-grey-card btn-darken-2" [id]="id" ngbDropdownToggle>Actions</button>
			<div ngbDropdownMenu>
				<button class="dropdown-item" (click)="deleteSelected()">Delete</button>
			</div>
		</div>
	`
})

export class SmartListBulkSelectComponent implements OnDestroy{
	@Input() id: string = '';
	@Input() listId: string = '';
	@Input() listIdArray: Array<string> = [];
	@Output() deleteSelectedItems = new Subject<Array<any>>();
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

	constructor(private _slcs: SmartListControlsService) {
		this.subscriptions.push( this._slcs.selectItem.subscribe( item => {
			this.checkList(this.listId, item);
			if ( this.listIdArray.length ) {
				this.listIdArray.forEach(id => this.checkList(id, item));
			}
		}) );
		this.subscriptions.push( this._slcs.deselectItem.subscribe( item => {
			this.checkList(this.listId, item);
			if ( this.listIdArray.length ) {
				this.listIdArray.forEach(id => this.checkList(id, item));
			}
		}) );
		this.subscriptions.push( this._slcs.deselectAll.subscribe(_ => {
			this.counter = 0;
			this.selectedItems = [];
		}) );
	}

	checkList(id, item) {
		if ( id === item.listId ) {
			item.isSelected ? this.addToSelected(this.selectedItems, item) : this.removeFromSelected(this.selectedItems, item);
		}
	}

	deleteSelected() {
		this.deleteSelectedItems.next(this.selectedItems);
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
		item.status = true;
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
