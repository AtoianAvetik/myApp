import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalService } from './modal.service';
import { ModalComponent } from './modal/modal.component';
import { ModalsComponent } from './modals.component';
import { OpenModalDirective } from './modal-open.directive';
import { CloseModalDirective } from './modal-close.directive';

@NgModule({
	exports: [
		ModalComponent,
		ModalsComponent,
		OpenModalDirective,
		CloseModalDirective
	],
	imports: [
		CommonModule
	],
	declarations: [
		ModalComponent,
		ModalsComponent,
		OpenModalDirective,
		CloseModalDirective
	],
	providers: [ModalService]
})
export class ModalModule { }
