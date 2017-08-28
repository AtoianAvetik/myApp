import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-accordion-group',
  templateUrl: './accordion-group.component.html',
  styleUrls: ['./accordion-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slide', [
      state('down' , style({ height: '*', display: 'block' })),
      state('up', style({ height: 0, display: 'none' })),
      state('firstLoad', style({ height: 0, display: 'none' })),
      transition('up => down', animate('300ms')),
      transition('down => up', animate('300ms'))
    ])
  ]
})

export class AccordionGroupComponent implements OnInit {
  private _isOpen = false;

  @Input() heading: string;
  @Input() openAllChanged: Observable<boolean> = new Subject<boolean>();

  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
  }

  get isOpen() {
    return this._isOpen;
  }

  ngOnInit() {
    this.openAllChanged
      .subscribe(
        (status: boolean) => {
          this.isOpen = status;
        }
      )
  }

  toggleOpen(event: MouseEvent) {
    event.preventDefault();
    this.isOpen = !this.isOpen;
  }
}
