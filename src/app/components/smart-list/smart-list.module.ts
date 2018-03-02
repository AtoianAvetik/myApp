import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from '../modals/modal.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SmartListService } from './smart-list.service';
import { SmartListControlsService } from './smart-list-controls.service';

import { SmartListComponent } from './smart-list.component';
import { SmartListItemComponent } from './smart-list-item/smart-list-item.component';
import { SmartListBulkSelectComponent } from './smart-list-controls/smart-list-bulk-select.component';

@NgModule({
	imports: [
		CommonModule,
		ModalModule,
		NgbModule
	],
	exports: [
		SmartListComponent,
		SmartListItemComponent,
		SmartListBulkSelectComponent
	],
	declarations: [
		SmartListComponent,
		SmartListItemComponent,
		SmartListBulkSelectComponent
	],
	providers: [SmartListService, SmartListControlsService]
})
export class SmartListModule { }
