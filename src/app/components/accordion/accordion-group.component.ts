import { Component, forwardRef, Host, Inject, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { AccordionComponent } from './accordion.component';
import { isUndefined } from 'util';

@Component({
	selector: 'accordion-group',
	templateUrl: './accordion-group.component.html',
	animations: [
		trigger('slide', [
			state('down' , style({ height: '*', display: 'block' })),
			state('up', style({ height: 0, display: 'none' })),
			transition('up => down', animate('300ms')),
			transition('down => up', animate('300ms'))
		])
	]
})

export class AccordionGroupComponent {
	private _isOpen = false;
	@Input()
	id: string;

	@Input()
	heading: string;

	@Input()
	disabled: string;

	@Input()
	set isOpen(value: boolean) {
		if (this.disabled)
			return;

		this._isOpen = value;
	}

	get isOpen() {
		return this._isOpen;
	}

	constructor(@Host() @Inject(forwardRef(() => AccordionComponent)) public accordion: AccordionComponent) {}

	toggle() {
		if (this.disabled)
			return;

		const isOpenBeforeChange = this.isOpen;

		this.accordion.closeOthers && this.accordion.toggleAll(false);

		this.isOpen = !isOpenBeforeChange;
	}

	onToggleClick(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();

		this.toggle();
	}
}
