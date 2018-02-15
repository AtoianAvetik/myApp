import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionComponent } from './accordion.component';
import { AccordionGroupComponent } from './accordion-group.component';
import { AccordionHeadingComponent } from './accordion-heading.component';

@NgModule({
	imports: [
		CommonModule
	],
	exports: [
		AccordionComponent,
		AccordionGroupComponent,
		AccordionHeadingComponent
	],
	declarations: [
		AccordionComponent,
		AccordionGroupComponent,
		AccordionHeadingComponent
	],
	providers: [],
})
export class AccordionModule { }
