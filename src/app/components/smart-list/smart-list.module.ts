import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from '../modals/modal.module';

import { SmartListComponent } from './smart-list.component';
import { SmartListItemComponent } from './smart-list-item/smart-list-item.component';
import { SmartListService } from './smart-list.service';

@NgModule({
	imports: [
		CommonModule,
		ModalModule
	],
	exports: [
		SmartListComponent,
		SmartListItemComponent
	],
	declarations: [
		SmartListComponent,
		SmartListItemComponent
	],
	providers: [SmartListService]
})
export class SmartListModule { }
