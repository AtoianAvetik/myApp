import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {AccordionComponent} from '../accordion.component';
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
      transition('down => up', animate('300ms')),
      transition('firstLoad => *', animate('0ms'))
    ])
  ]
})
export class AccordionGroupComponent implements OnDestroy, OnInit {
  private _isOpen = false;
  state = 'firstLoad';

  @Input() heading: string;

  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
    if (value) {
      // this.accordion.closeOthers(this);
    }
  }

  get isOpen() {
    return this._isOpen;
  }

  constructor(private accordion: AccordionComponent, private accordionService: AccordionService) {
    this.accordion.addGroup(this);
  }

  ngOnInit() {
    this.state = 'up';
    this.accordionService.openAllChanged
      .subscribe(
        (status: boolean) => {
          this.isOpen = status;
        }
      )
  }

  ngOnDestroy() {
    this.accordion.removeGroup(this);
  }

  toggleOpen(event: MouseEvent): void {
    event.preventDefault();
    this.isOpen = !this.isOpen;
  }
}
