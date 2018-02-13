import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subject } from 'rxjs/Subject';

import { NotificationService } from '../notification.service';

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
  progress = 0;
  lastProgress = 0;

  constructor(private notificationService: NotificationService,
              private elRef: ElementRef) {
  }

  ngOnInit() {
    (this.timeout > 0) && this.initProgressBar();
    this.typeClass = this.notificationService.getInfo(this.type, 'typeClass');
    this.iconClass = this.notificationService.getInfo(this.type, 'iconClass');
    this.title = this.notificationService.getInfo(this.type, 'title');
  }

  ngAfterViewInit() {
    this.timeout && this.timer.next();
  }

  initProgressBar() {
    let k = this.timeout/100;
    this.progressBar = this.elRef.nativeElement.querySelector('.app-notification_progress-bar');
    const sub = this.timer.subscribe(
      () => {
        let started = new Date().getTime();
        this.interval = setInterval(() => {
          let curTime = new Date().getTime();
          this.progress = this.lastProgress + (curTime - started)/k;
          if ( this.progress >= 100 ) {
            clearInterval(this.interval);
            sub.unsubscribe();
            this._ref.destroy();
          } else {
            this.progressBar['style'].width = this.progress + "%";
          }
        }, 0);
      }
    );
  }

  closeNotification() {
    clearInterval(this.interval);
    this._ref.destroy();
  }

  onMouseenter() {
    clearInterval(this.interval);
    this.lastProgress = this.progress;
  }

  onMouseleave() {
    this.timer.next();
  }
}
