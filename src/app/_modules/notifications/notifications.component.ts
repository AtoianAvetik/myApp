import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit,
  ViewContainerRef, ElementRef } from '@angular/core';

import { NotificationService } from '../../_services/notification.service';
import { Notification, NotificationType } from '../../_models/notification.model';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-notifications',
  template: ``,
  styleUrls: ['./notifications.component.scss'],
  host: {'class': 'page-notification-wrap'}
})
export class NotificationsComponent implements OnInit {
  alerts: Notification[] = [];
  componentRef: ComponentRef<Notification>;

  constructor(private notificationService: NotificationService,
              private resolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private elRef: ElementRef) { }

  ngOnInit() {
    this.notificationService.getNotification().subscribe((data: Notification) => {
      if (!data) {
        // clear notifications when an empty data is received
        this.viewContainerRef.clear();
        return;
      }

      const type = this.cssClass(data);

      // create notification
      this.createNotification(type, data.message);
    });
  }

  createNotification(type, message) {
    const factory: ComponentFactory<Notification> = this.resolver.resolveComponentFactory(NotificationComponent);

    this.componentRef = this.viewContainerRef.createComponent(factory);
    this.componentRef.instance.type = type;
    this.componentRef.instance.message = message;

    this.elRef.nativeElement.appendChild(this.componentRef.location.nativeElement);
  }

  removeAlert(notification: Notification) {
    this.alerts = this.alerts.filter(x => x !== notification);
  }

  cssClass(notification: Notification) {
    if (!notification) {
      return;
    }

    // return css class based on notification type
    switch (notification.type) {
      case NotificationType.Success:
        return 'success';
      case NotificationType.Error:
        return 'danger';
      case NotificationType.Info:
        return 'info';
      case NotificationType.Warning:
        return 'warning';
    }
  }
}
