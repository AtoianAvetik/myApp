import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationService } from './notification.service';
import { NotificationComponent } from './notification/notification.component';
import { NotificationsComponent } from './notifications.component';

@NgModule({
	exports: [
		NotificationComponent,
		NotificationsComponent
	],
	imports: [
		CommonModule
	],
	declarations: [
		NotificationComponent,
		NotificationsComponent
	],
	entryComponents: [NotificationComponent],
	providers: [NotificationService]
})
export class NotificationModule { }
