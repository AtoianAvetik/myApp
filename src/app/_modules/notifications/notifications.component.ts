import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit,
  ViewContainerRef, ElementRef, HostBinding
} from '@angular/core';

import { NotificationService } from '../../_services/notification.service';
import { Notification, NotificationType } from '../../_models/notification.model';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-notifications',
  template: `
    <div class="page-notification-wrapper"></div>
  `,
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @HostBinding('class.page-notification-wrap') isActive = true;
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

      const type = this.getCssClass(data);
      const title = this.getTitle(data);
      const icon = this.getIcon(data);

      // create notification
      this.createNotification(type, title, icon, data.message);
    });
  }

  createNotification(type, title, icon, message) {
    const factory: ComponentFactory<Notification> = this.resolver.resolveComponentFactory(NotificationComponent);

    this.componentRef = this.viewContainerRef.createComponent(factory);
    this.componentRef.instance.type = type;
    this.componentRef.instance.title = title;
    this.componentRef.instance.icon = icon;
    this.componentRef.instance.message = message;
    this.componentRef.instance._ref = this.componentRef;

    this.elRef.nativeElement.querySelector('.page-notification-wrapper').appendChild(this.componentRef.location.nativeElement);
  }

  getCssClass(notification: Notification) {
    if (!notification) {
      return;
    }

    // return css class based on notification type
    switch (notification.type) {
      case NotificationType.Success:
        return 'success';
      case NotificationType.Error:
        return 'error';
      case NotificationType.Info:
        return 'info';
      case NotificationType.Warning:
        return 'warning';
    }
  }

  getTitle(notification: Notification) {
    if (!notification) {
      return;
    }

    // return css class based on notification type
    switch (notification.type) {
      case NotificationType.Success:
        return 'Success';
      case NotificationType.Error:
        return 'Error';
      case NotificationType.Info:
        return 'Notification';
      case NotificationType.Warning:
        return 'Attention';
    }
  }

  getIcon(notification: Notification) {
    if (!notification) {
      return;
    }

    // return css class based on notification type
    switch (notification.type) {
      case NotificationType.Success:
        return 'icon-check';
      case NotificationType.Error:
        return 'icon-cross';
      case NotificationType.Info:
        return 'icon-check';
      case NotificationType.Warning:
        return 'icon-check';
    }
  }
}
