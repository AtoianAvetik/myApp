import { Component, Input, OnInit } from '@angular/core';

import { NotificationService } from '../../../_services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {
  @Input() message: any;
  @Input() type: any;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
  }
}
