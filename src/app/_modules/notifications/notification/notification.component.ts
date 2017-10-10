import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subject } from 'rxjs/Subject';

import { NotificationService } from '../../../_services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        style({transform: 'translateX(-100%)', opacity: 0}),
        animate(150)
      ]),
      transition('* => void', [
        animate(250, style({transform: 'translateX(100%)', opacity: 0}))
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit, AfterViewInit {
  @HostBinding('@flyInOut') animation = true;
  @HostBinding('style.display') display = 'block';
  @Input() type: any;
  @Input() message: string;
  @Input() _ref: any;
  @Input() timeout: any;
  typeClass: string;
  iconClass: string;
  title: string;
  timer = new Subject<number>();
  progressBar: ElementRef;
  interval;
  curTime;
  k;

  constructor(private notificationService: NotificationService,
              private elRef: ElementRef) {
  }

  ngOnInit() {
    if ( this.timeout ) {
      this.k = this.timeout/100;
      this.progressBar = this.elRef.nativeElement.querySelector('.page-notification_progress-bar');
    }
    const sub = this.timer.subscribe(
      (time: number) => {
        let i = 0;
        this.interval = setInterval(() => {
          i++;
          this.timeout && (this.progressBar['style'].width = i/this.k + "%");
          if ( i === time ) {
            clearInterval(this.interval);
            sub.unsubscribe();
            this._ref.destroy();
          }
        }, 0);
      }
    );
    this.typeClass = this.notificationService.getInfo(this.type, 'typeClass');
    this.iconClass = this.notificationService.getInfo(this.type, 'iconClass');
    this.title = this.notificationService.getInfo(this.type, 'title');
  }

  ngAfterViewInit() {
    this.timeout && this.timer.next(this.timeout);
  }

  closeNotification() {
    clearInterval(this.interval);
    this._ref.destroy();
  }
}
