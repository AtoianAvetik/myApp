import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';

import { SmartListService } from '../smart-list.service';
import { SmartListItemModel } from '../smart-list-item.model';

@Component( {
	selector: 'smart-list-item',
	templateUrl: './smart-list-item.component.html',
	styleUrls: ['./smart-list-item.component.scss']
} )
export class SmartListItemComponent implements OnInit {
	@Input() item;
	@Input() listId;
	@Input() settings;

	itemSmartModel: SmartListItemModel;

	// States
	isFocused = false;
	private _isSelected = false;
	@Input()
	set isSelected(value: boolean) {
		if ( this._isSelected === value )
			return;
		this._isSelected = value;
		this.itemSmartModel.isSelected = value;
		this._smartListService[value ? 'selectItem' : 'deselectItem'].next( this.itemSmartModel );
	};
	get isSelected() {
		return this._isSelected;
	}

	@HostListener('document:click', ['$event.target'])
	onClick(targetElement) {
		this.onClickOutside(targetElement);
	}

	constructor( private _smartListService: SmartListService,
	             private _elementRef: ElementRef) {
		this._smartListService.deselectAll.subscribe(_ => {
			this.isFocused = false;
			this.isSelected = false;
		});
	}

	ngOnInit() {
		this.itemSmartModel = new SmartListItemModel(this.item.id, this.listId, this.item, this.isSelected);
	}

	onClickItem( event ) {
		this.stopPropagation( event );
		this.isSelected = !this.isSelected;
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

	onFocusItem() {
		this.isFocused = true;
		this._smartListService.selectItem.next( this.itemSmartModel );
	}

	stopPropagation( event ) {
		event.stopPropagation();
	}

	onClickOutside(target) {
		const clickedInside = this._elementRef.nativeElement.contains(target);
		let isExcNodes = false;

		this.settings.exceptionNodes.forEach( sel => {
			if ( target.closest( sel ) )
			    isExcNodes = true;
		});

		if (!clickedInside && !isExcNodes) {
			this.isFocused = false;
			this.isSelected = false;
			this._smartListService.deselectAll.next();
		}
	}
}
