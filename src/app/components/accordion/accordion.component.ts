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

	toggle(id: string) {
		this.groups.toArray().forEach(group => {
			(group.id === id) && group.toggle();
		});
	}

	toggleAll(state?: boolean) {
		this.groups.toArray().forEach(group => {
			if ( state !== undefined ) {
				group.isOpen = state;
			} else {
				group.toggle();
			}
		});
	}
}
