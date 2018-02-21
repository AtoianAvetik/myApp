import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component( {
	selector: 'smart-list',
	templateUrl: './smart-list.component.html',
	styleUrls: ['./smart-list.component.scss']
} )
export class SmartListComponent implements OnInit {
	@Input() list: any;
	@Input() listId: string;
	@Input() viewType: string = 'list';
	listClass = 'smart-list -';
	@ContentChild(TemplateRef) templateRef: TemplateRef<any>;

	constructor() {}

	ngOnInit() {
		this.listClass = this.listClass + this.viewType;
	}
}
