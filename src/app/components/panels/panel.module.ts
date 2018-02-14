import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenPanelDirective } from './panel-open.directive';
import { ClosePanelDirective } from './panel-close.directive';
import { PanelService } from './panel.service';
import { PanelComponent } from './panel/panel.component';
import { PanelsComponent } from './panels.component';

@NgModule({
	exports: [
		PanelComponent,
		PanelsComponent,
		OpenPanelDirective,
		ClosePanelDirective
	],
	imports: [
		CommonModule
	],
	declarations: [
		PanelComponent,
		PanelsComponent,
		OpenPanelDirective,
		ClosePanelDirective
	],
	providers: [PanelService]
})
export class PanelModule { }
