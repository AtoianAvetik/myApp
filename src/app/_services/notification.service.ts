import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Notification, NotificationType } from '../_models/notification.model';

@Injectable()
export class NotificationService {
  private subject = new Subject<Notification>();

  constructor() {}

  getNotification(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string) {
    this.notification(NotificationType.Success, message);
  }

  error(message: string) {
    this.notification(NotificationType.Error, message);
  }

  info(message: string) {
    this.notification(NotificationType.Info, message);
  }

  warn(message: string) {
    this.notification(NotificationType.Warning, message);
  }

  notification(type: NotificationType, message: string) {
    this.subject.next(<Notification>{ type: type, message: message });
  }

  clear() {
    // clear alerts
    this.subject.next();
  }
}
