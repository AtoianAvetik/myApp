import { Component, ContentChildren, forwardRef, Input, QueryList, ViewEncapsulation } from '@angular/core';

import { AccordionGroupComponent } from './accordion-group.component';

@Component( {
	selector: 'accordion',
	template: `
		<div aria-multiselectable="true">
			<ng-content></ng-content>
		</div>
	`,
	styleUrls: ['./accordion.component.scss'],
	encapsulation: ViewEncapsulation.None
} )

export class AccordionComponent {
	@Input()
	closeOthers = true;

	@Input()
	showArrows = false;

	@Input()
	expandAll = false;

	@ContentChildren(forwardRef(() => AccordionGroupComponent))
	groups: QueryList<AccordionGroupComponent>;

	closeAll() {
		this.groups.toArray().forEach(group => {
			group.isOpen = false;
		});
	}
}
