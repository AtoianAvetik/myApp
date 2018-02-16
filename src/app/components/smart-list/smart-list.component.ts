import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component( {
	selector: '[smart-list]',
	template: `
		<ng-content></ng-content>
	`,
	styleUrls: ['./smart-list.component.scss']
} )
export class SmartListComponent implements OnInit {
	@Input() viewType = 'list';
	@HostBinding( 'attr.class' ) listClass = 'smart-list -';

	constructor() {}

	ngOnInit() {
		this.listClass = this.listClass + this.viewType;
	}
}
