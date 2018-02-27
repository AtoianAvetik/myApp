import {
	AfterContentInit, Component, ContentChildren, forwardRef, Input, QueryList,
	ViewEncapsulation
} from '@angular/core';

import { AccordionGroupComponent } from './accordion-group.component';
import { Subscription } from 'rxjs/Subscription';

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

export class AccordionComponent implements AfterContentInit {
	@Input()
	closeOthers = true;

	@Input()
	showArrows = false;

	@Input()
	expandAll = false;

	@ContentChildren(forwardRef(() => AccordionGroupComponent))
	groups: QueryList<AccordionGroupComponent>;

	/**
	 * We need to save old groups to make difference and find newly changed group, to toggle them.
	 */
	private oldGroups: AccordionGroupComponent[];

	private subscription: Subscription;

	ngAfterContentInit() {
		this.toggleAll(this.expandAll);
		if (this.expandAll) {
			// this.closeOthers = false;
			this.oldGroups = this.groups.toArray();
			this.toggleAll(true, this.oldGroups);

			// we subscribe for changes, and if new groups are added we open them automatically
			this.subscription = this.groups.changes.subscribe(change => {
				const newGroups = this.groups.toArray().filter(group => {
					return this.oldGroups.indexOf(group) === -1;
				});
				this.toggleAll(true, newGroups);

				this.oldGroups = this.groups.toArray();
			});
		}
	}

	toggle(id: string) {
		this.groups.toArray().forEach(group => {
			(group.id === id) && group.toggle();
		});
	}

	toggleAll(state?: boolean, groups = this.groups.toArray()) {
		groups.forEach(group => {
			if ( state !== undefined ) {
				group.isOpen = state;
			} else {
				group.toggle();
			}
		});
	}
}
