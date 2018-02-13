import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationService } from './notification.service';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
	exports: [
		NotificationComponent
	],
	imports: [
		CommonModule
	],
	declarations: [
		NotificationComponent
	],
	entryComponents: [NotificationComponent],
	providers: [NotificationService]
})
export class NotificationModule { }
