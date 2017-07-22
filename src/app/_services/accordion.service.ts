import {EventEmitter, Injectable, Output} from '@angular/core';

import { AccordionGroupComponent } from '../components/accordion/accordion-group/accordion-group.component';

@Injectable()
export class AccordionService {
  @Output() openAllChanged = new EventEmitter<boolean>();
  @Output() groupsChanged = new EventEmitter<AccordionGroupComponent[]>();
  groups: AccordionGroupComponent[] = [];

  addGroup(group: AccordionGroupComponent) {
    this.groups.push(group);
    this.groupsChanged.emit(this.groups.slice());
  }

  removeGroup(group: AccordionGroupComponent) {
    const index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
    this.groupsChanged.emit(this.groups.slice());
  }
}
