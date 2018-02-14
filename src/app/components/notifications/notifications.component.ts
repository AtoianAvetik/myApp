import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit,
  ViewContainerRef, ElementRef, HostBinding
} from '@angular/core';

import { NotificationService } from './notification.service';
import { Notification } from './notification.model';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-notifications',
  template: `
    <div class="app-notification-wrapper"></div>
  `,
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @HostBinding('class.app-notification-wrap') isActive = true;
  componentRef: ComponentRef<Notification>;

  constructor(private notificationService: NotificationService,
              private resolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private elRef: ElementRef) { }

  ngOnInit() {
    this.notificationService.getNotification().subscribe((notification: Notification) => {
      if (!notification) {
        // clear notifications-page when an empty data is received
        this.viewContainerRef.clear();
        return;
      }

      // create notification
      this.createNotification(notification);
    });
  }

  createNotification(notification) {
    const factory: ComponentFactory<Notification> = this.resolver.resolveComponentFactory(NotificationComponent);

    this.componentRef = this.viewContainerRef.createComponent(factory);
    this.componentRef.instance.type = notification.type;
    this.componentRef.instance.message = notification.message;
    this.componentRef.instance.timeout = notification.timeout;
    this.componentRef.instance._ref = this.componentRef;

    this.elRef.nativeElement.querySelector('.app-notification-wrapper').appendChild(this.componentRef.location.nativeElement);
  }
}
