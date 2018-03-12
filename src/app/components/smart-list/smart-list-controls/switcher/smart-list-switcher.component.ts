import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {
	SMART_LIST_CELL_SIZES, SMART_LIST_IMG_SIZES, SMART_LIST_SWITCHER_TYPES,
	SMART_LIST_VIEW_TYPES
} from '../../smart-list.config';

@Component({
	selector: 'smart-list-switcher',
	templateUrl: './smart-list-switcher.component.html'
})

export class SmartListSwitcherComponent implements OnInit {
	types = SMART_LIST_SWITCHER_TYPES;
	viewTypes = SMART_LIST_VIEW_TYPES;
	imgSizes = SMART_LIST_IMG_SIZES;
	cellSizes = SMART_LIST_CELL_SIZES;

	@Input() type: any = {};
	@Input() state: string;

	@Output() onChange = new Subject<any>();

	ngOnInit() {
		!this.state && (this.state = this.type.defValue);
	}
}
