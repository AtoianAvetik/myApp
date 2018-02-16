import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from '../modals/modal.module';
import { AccordionModule } from '../accordion/accordion.module';

import { SmartFoldersService } from './smart-folders.service';
import { SmartFoldersComponent } from './smart-folders.component';
import { SmartFoldersGroupComponent } from './smart-folders-group/smart-folders-group.component';

@NgModule({
	imports: [
		CommonModule,
		ModalModule,
		AccordionModule
	],
	exports: [
		SmartFoldersComponent,
		SmartFoldersGroupComponent
	],
	declarations: [
		SmartFoldersComponent,
		SmartFoldersGroupComponent
	],
	providers: [SmartFoldersService]
})
export class SmartFoldersModule { }
