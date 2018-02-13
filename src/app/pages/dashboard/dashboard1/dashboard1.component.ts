import { Component } from '@angular/core';
import { LoaderService } from '../../../components/loader/loader.service';
import { NotificationService } from '../../../components/notifications/notification.service';

@Component({
    selector: 'app-dashboard1',
    templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.scss']
})

export class Dashboard1Component {
	loader;

	constructor(private _loaderService: LoaderService, private _notificationService: NotificationService) {}

	// Loaders

	loaderOpen(id: string, text: string) {
		if ( text ) {
			this.loader = this._loaderService.create({
				id: id,
				content: text
			});
		} else {
			this.loader = this._loaderService.create({
				id: id
			});
		}
		this.loader.present().subscribe(() =>{
			setTimeout(() => {
				this.loader.dismiss();
			},1000)
		});
	}

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
