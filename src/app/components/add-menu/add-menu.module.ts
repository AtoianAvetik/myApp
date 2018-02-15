import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddMenuComponent } from './add-menu.component';

@NgModule({
	exports: [
		AddMenuComponent
	],
	imports: [
		CommonModule,
		NgbModule
	],
	declarations: [
		AddMenuComponent
	],
	providers: [],
})
export class AddMenuModule { }
