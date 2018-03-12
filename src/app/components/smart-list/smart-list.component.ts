import {
	Component, ContentChild, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange, TemplateRef,
	ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { SmartListService } from './smart-list.service';
import { DEFAULT_SMART_LIST_SETTINGS, SmartListSettingsInterface } from './smart-list.config';
import { SmartListItemModel } from './smart-list-item.model';

@Component( {
	selector: 'smart-list',
	templateUrl: './smart-list.component.html',
	styleUrls: ['./smart-list.component.scss'],
	providers: [SmartListService],
	encapsulation: ViewEncapsulation.None
} )
export class SmartListComponent implements OnInit, OnDestroy, OnChanges {
	// Get settings
	@Input() id: string;
	@Input() source: any;
	@Input() settings: SmartListSettingsInterface = {};

	// Bind simple options;
	inputOptions: SmartListSettingsInterface = {};
	@Input() exceptionNodes: Array<string> = []; // for prevent deselect on click
	@Input() viewType: string;
	@Input() imgSize: string;
	@Input() cellSize: string;
	@Input() viewTypeChange = new Subject();
	@Input() imgSizeChange = new Subject();
	@Input() cellSizeChange = new Subject();

	// Bind actions
	@Input() select: SmartListItemModel;
	@Input() deselectItem: SmartListItemModel;
	@Output() selectChange = new Subject<SmartListItemModel>();
	@Output() deselectChange = new Subject<SmartListItemModel>();
	@Output() edit = new Subject();
	@Output() delete = new Subject();

	@ContentChild(TemplateRef) templateRef: TemplateRef<any>;

	subscriptions: Array<Subscription> = [];

	constructor(private _smartListService: SmartListService) {}

	ngOnInit() {
		console.log(this.viewType);
		this.settings = this.prepareSettings();
		this.source = this.prepareSource();

		// Subscribe events for update actions
		this.subscriptions.push( this._smartListService.selectItem.subscribe( (item: SmartListItemModel) => this.selectChange.next(item)) );
		this.subscriptions.push( this._smartListService.deselectItem.subscribe( (item: SmartListItemModel) => this.deselectChange.next(item)) );
		this.subscriptions.push( this._smartListService.editSelectedItem.subscribe( value => this.edit.next(value)) );
		this.subscriptions.push( this._smartListService.deleteSelectedItem.subscribe( value => this.delete.next(value)) );

		// Subscribe events for update options
		this.subscriptions.push( this.viewTypeChange.subscribe( (value: string) => { this.onSettingsChange({viewType: value}) } ) );
		this.subscriptions.push( this.imgSizeChange.subscribe( (value: string) => { this.onSettingsChange({imgSize: value}) } ) );
		this.subscriptions.push( this.cellSizeChange.subscribe( (value: string) => { this.onSettingsChange({cellSize: value}) } ) );
	}

	ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
		if ( changes['settings'] ) {
			this.settings = this.prepareSettings();
		}
		if ( changes['source'] ) {
			this.source = this.prepareSource();
		}
		if ( changes['viewType'] || changes['imgSize'] || changes['cellSize'] ) {
			this.onSettingsChange();
		}
	}

	ngOnDestroy() {
		this.subscriptions.forEach( ( subscription: Subscription ) => {
			subscription.unsubscribe();
		} );
	}

	prepareSettings(options?: SmartListSettingsInterface):Object {
		return Object.assign({}, DEFAULT_SMART_LIST_SETTINGS, this.settings, options || this.prepareInputOptions() );
	}

	prepareInputOptions():SmartListSettingsInterface {
		const options = {};

		options['exceptionNodes'] = this.exceptionNodes;
		this.viewType && (options['viewType'] = this.viewType);
		this.imgSize && (options['imgSize'] = this.imgSize);
		this.cellSize && (options['cellSize'] = this.cellSize);

		console.log(options);

		return Object.assign({}, options, this.inputOptions);
	}

	prepareSource() {
		return this.source;
	}

	onSettingsChange(options?: SmartListSettingsInterface) {
		this.settings = this.prepareSettings(options);
	}
}
