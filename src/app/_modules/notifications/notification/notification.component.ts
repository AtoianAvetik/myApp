import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { NotificationService } from '../../../_services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit {
  @HostBinding('@flyInOut') animation = true;
  @HostBinding('style.display') display = 'block';
  @Input() message: any;
  @Input() type: any;
  @Input() title: any;
  @Input() icon: any;
  @Input() _ref: any;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
  }

  closeNotification() {
    this._ref.destroy();
  }
}
