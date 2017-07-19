import { Component, HostBinding, Input, OnDestroy } from '@angular/core';
import { AccordionGroupComponent } from './accordion-group/accordion-group.component';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-accordion',
  template: `
    <ng-content></ng-content>
  `
})

export class AccordionComponent {
  @HostBinding('attr.class') class = 'panel-group';

  groups: Array<AccordionGroupComponent> = [];

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
