import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalModule } from '../modals/modal.module';
import { CustomMaterialModule } from '../../shared/material.module';

import { SmartListService } from './smart-list.service';
import { SmartListControlsService } from './smart-list-controls.service';

import { SmartListComponent } from './smart-list.component';
import { SmartListItemComponent } from './smart-list-item/smart-list-item.component';
import { SmartListBulkSelectComponent } from './smart-list-controls/bulk-select/smart-list-bulk-select.component';
import { SmartListSwitcherComponent } from './smart-list-controls/switcher/smart-list-switcher.component';

@NgModule({
	imports: [
		CommonModule,
		CustomMaterialModule,
		ModalModule,
		NgbModule,
		FormsModule
	],
	exports: [
		SmartListComponent,
		SmartListItemComponent,
		SmartListBulkSelectComponent,
		SmartListSwitcherComponent
	],
	declarations: [
		SmartListComponent,
		SmartListItemComponent,
		SmartListBulkSelectComponent,
		SmartListSwitcherComponent
	],
	providers: [SmartListService, SmartListControlsService]
})
export class SmartListModule { }
