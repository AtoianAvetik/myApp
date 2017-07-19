import { Component, HostBinding, OnInit } from '@angular/core';
import { AccordionGroupComponent } from './accordion-group/accordion-group.component';
import { AccordionService } from '../_services/accordion.service';

@Component({
  selector: 'app-accordion',
  template: `
    <ng-content></ng-content>
  `
})

export class AccordionComponent implements OnInit {
  @HostBinding('attr.class') class = 'panel-group';

  groups: AccordionGroupComponent[] = [];

  constructor(private accordionService: AccordionService) {}

  ngOnInit() {
    console.log(this.groups);
    this.accordionService.groupsChanged
      .subscribe(
        (groups: AccordionGroupComponent[]) => {
          this.groups = groups;
          console.log(groups);
        }
      );
  }
}
