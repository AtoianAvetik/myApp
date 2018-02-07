import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit,
  ViewContainerRef, ElementRef, HostBinding
} from '@angular/core';

import { NotificationService } from '../../_services/notification.service';
import { Notification } from '../../_models/notification.model';
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
    this.notificationService.getNotification().subscribe((notification: Notification) => {
      if (!notification) {
        // clear notifications when an empty data is received
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

    this.elRef.nativeElement.querySelector('.page-notification-wrapper').appendChild(this.componentRef.location.nativeElement);
  }
}
