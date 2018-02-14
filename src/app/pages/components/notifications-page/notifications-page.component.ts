import { Component } from '@angular/core';

import { NotificationService } from '../../../components/notifications/notification.service';

@Component({
	selector: 'app-notifications-page',
	templateUrl: './notifications-page.component.html',
	styleUrls: ['./notifications-page.component.scss']
})

export class NotificationsPageComponent {
	constructor(private _notificationService: NotificationService) {}

	// Notifications

	createSuccessNotification(message = '', timeout) {
		this._notificationService.success(message, timeout);
	}
	createErrorNotification(message = '') {
		this._notificationService.error(message);
	}
	createInfoNotification(message = '') {
		this._notificationService.info(message);
	}
	createWarningNotification(message = '') {
		this._notificationService.warn(message);
	}
	clearNotification() {
		this._notificationService.clear();
	}
}
