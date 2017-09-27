import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AppService } from '../../_services/app.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
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

export class AccordionComponent implements OnInit {
  private _isOpen = false;

  @Input() heading: string;

  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
  }

  get isOpen() {
    return this._isOpen;
  }

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.toogleAccordionsChange
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
