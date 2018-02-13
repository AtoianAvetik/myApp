import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Notification, NotificationType } from './notification.model';

@Injectable()
export class NotificationService {
  private subject = new Subject<Notification>();
  private timeout = 2500;
  notificationsData = {
    success: {
      typeClass: 'success',
      iconClass: 'ft-check',
      title: 'Success'
    },
    error: {
      typeClass: 'danger',
      iconClass: 'ft-x',
      title: 'Error'
    },
    info: {
      typeClass: 'info',
      iconClass: 'ft-info',

      title: 'Notification'
    },
    warning: {
      typeClass: 'warning',
      iconClass: 'ft-alert-triangle',
      title: 'Attention'
    },
  };

  constructor() {}

  getNotification(): Observable<any> {
    return this.subject.asObservable();
  }

  getInfo(type, kind) {
    if (!kind) {
      return;
    }

    // return css class based on notification type
    switch (type) {
      case NotificationType.Success:
        return this.notificationsData.success[kind];
      case NotificationType.Error:
        return this.notificationsData.error[kind];
      case NotificationType.Info:
        return this.notificationsData.info[kind];
      case NotificationType.Warning:
        return this.notificationsData.warning[kind];
    }
  }

  success(message: string, timeout = this.timeout) {
    this.notification(NotificationType.Success, message, timeout);
  }

  error(message: string, timeout = this.timeout) {
    this.notification(NotificationType.Error, message, timeout);
  }

  info(message: string, timeout = this.timeout) {
    this.notification(NotificationType.Info, message, timeout);
  }

  warn(message: string, timeout = this.timeout) {
    this.notification(NotificationType.Warning, message, timeout);
  }

  notification(type: NotificationType, message: string, timeout: number) {
    this.subject.next(<Notification>{ type: type, message: message, timeout: timeout });
  }

  clear() {
    // clear alerts
    this.subject.next();
  }
}
