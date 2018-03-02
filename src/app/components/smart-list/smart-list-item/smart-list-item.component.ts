import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SmartListService } from '../smart-list.service';
import { ModalService } from "../../modals/modal.service";
import { SmartListItemModel } from '../smart-list-item.model';

@Component( {
	selector: 'smart-list-item',
	templateUrl: './smart-list-item.component.html',
	styleUrls: ['./smart-list-item.component.scss']
} )
export class SmartListItemComponent implements OnInit, OnDestroy {
	@Input() listId;
	@Input() itemIndex;
	@Input() item;
	isItemSelected: boolean = false;
	isItemFocused: boolean = false;
	private subscriptions: Array<Subscription> = [];
	@HostListener('document:click', ['$event.target'])
	onClick(targetElement) {
		this.onClickOutside(targetElement);
	}

	constructor( private _smartListService: SmartListService,
	             private _modalService: ModalService,
	             private _elementRef: ElementRef) {
	}

	ngOnInit() {
		this.subscriptions.push( this._modalService.modalClosingDidStart.subscribe(
			() => {
				this.isItemFocused = false;
			}
		) );
	}

	ngOnDestroy() {
		this.subscriptions.forEach( ( subscription: Subscription ) => {
			subscription.unsubscribe();
		} );
	}

	onEditItem( event ) {
		this.stopPropagation( event );
		this.onFocusItem();
		this._smartListService.editSelectedItem.next();
	}

	onDeleteItem( event ) {
		this.stopPropagation( event );
		this.onFocusItem();
		this._smartListService.deleteSelectedItem.next();
	}

	onClickItem( event ) {
		this.stopPropagation( event );
		this.isItemSelected ? this.deselectItem() : this.selectItem();
	}

	onFocusItem() {
		this.isItemFocused = true;
		this._smartListService.selectItem.next( new SmartListItemModel(this.itemIndex, this.listId, this.isItemSelected) );
	}

	selectItem() {
		this.isItemSelected = true;
		this._smartListService.selectItem.next( new SmartListItemModel(this.itemIndex, this.listId, this.isItemSelected) );
	}

	deselectItem() {
		this.isItemSelected = false;
		this._smartListService.deselectItem.next( new SmartListItemModel(this.itemIndex, this.listId, this.isItemSelected) );
	}

	stopPropagation( event ) {
		event.stopPropagation();
	}

	onClickOutside(target) {
		const clickedInside = this._elementRef.nativeElement.contains(target);
		if (!clickedInside) {
			this.isItemSelected = false;
			this.isItemFocused = false;
			this._smartListService.deselectAll.next();
		}
	}
}
