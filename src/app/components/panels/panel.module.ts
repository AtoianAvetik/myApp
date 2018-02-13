import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenPanelDirective } from './panel-open.directive';
import { ClosePanelDirective } from './panel-close.directive';
import { PanelService } from './panel.service';
import { PanelComponent } from './panel/panel.component';

@NgModule({
	exports: [
		PanelComponent,
		OpenPanelDirective,
		ClosePanelDirective
	],
	imports: [
		CommonModule
	],
	declarations: [
		PanelComponent,
		OpenPanelDirective,
		ClosePanelDirective
	],
	providers: [PanelService]
})
export class PanelModule { }
