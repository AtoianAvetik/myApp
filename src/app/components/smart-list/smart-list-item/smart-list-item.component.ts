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
	@Input() item;
	@Input() listId;
	@Input() settings;
	itemSmartModel: SmartListItemModel;

	// States
	private _isSelected = false;
	private _isFocused = false;
	@Input()
	set isSelected(value: boolean) {
		this._isSelected = value;
		this.itemSmartModel.isSelected = value;
	};
	get isSelected() {
		return this._isSelected;
	}
	@Input()
	set isFocused(value: boolean) {
		this._isFocused = value;
	};
	get isFocused() {
		return this._isFocused;
	}

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
		this.itemSmartModel = new SmartListItemModel(this.item.id, this.listId, this.isSelected);
		this.subscriptions.push( this._modalService.modalClosingDidStart.subscribe(
			() => {
				this.isFocused = false;
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
		this.isSelected ? this.deselectItem() : this.selectItem();
	}

	onFocusItem() {
		this.isFocused = true;
		this._smartListService.selectItem.next( this.itemSmartModel );
	}

	selectItem() {
		this.isSelected = true;
		this._smartListService.selectItem.next( this.itemSmartModel );
	}

	deselectItem() {
		this.isSelected = false;
		this._smartListService.deselectItem.next( this.itemSmartModel );
	}

	stopPropagation( event ) {
		event.stopPropagation();
	}

	onClickOutside(target) {
		const clickedInside = this._elementRef.nativeElement.contains(target);
		if (!clickedInside) {
			this.isSelected = false;
			this.isFocused = false;
			this._smartListService.deselectAll.next();
		}
	}
}
