import {Component, HostBinding, OnInit} from '@angular/core';
import { AccordionGroupComponent } from './accordion-group/accordion-group.component';
import {AccordionService} from '../_services/accordion.service';

@Component({
  selector: 'app-accordion',
  template: `
    <ng-content></ng-content>
  `
})

export class AccordionComponent implements OnInit {
  @HostBinding('attr.class') class = 'panel-group';

  groups: Array<AccordionGroupComponent> = [];

  constructor() {}

  ngOnInit() {

  }

  addGroup(group: AccordionGroupComponent): void {
    this.groups.push(group);
  }

  closeOthers(openGroup: AccordionGroupComponent): void {
    this.groups.forEach((group: AccordionGroupComponent) => {
      if (group !== openGroup) {
        group.isOpen = false;
        group.state = 'up';
      } else {
      }
    });
  }

  removeGroup(group: AccordionGroupComponent): void {
    const index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  }
}
