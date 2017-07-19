import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {AccordionService} from '../../_services/accordion.service';

@Component({
  selector: 'app-accordion-group',
  templateUrl: './accordion-group.component.html',
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
export class AccordionGroupComponent implements OnInit, OnDestroy {
  private _isOpen = false;

  @Input() heading: string;

  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
  }

  get isOpen() {
    return this._isOpen;
  }

  constructor(private accordionService: AccordionService) {
    this.accordionService.addGroup(this);
  }

  ngOnInit() {
    this.accordionService.openAllChanged
      .subscribe(
        (status: boolean) => {
          this.isOpen = status;
        }
      )
  }

  ngOnDestroy() {
    this.accordionService.removeGroup(this);
  }

  toggleOpen(event: MouseEvent) {
    event.preventDefault();
    this.isOpen = !this.isOpen;
  }
}
