import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


export class AppService {
  appWrapClicked = new Subject();
  toogleSidebarChange = new Subject<boolean>();
  toogleAccordionsChange = new Subject<boolean>();
  isSidebarExpanded = true;

  constructor() {
    this.toogleSidebarChange
      .subscribe(
        (status) => {
          this.isSidebarExpanded = status;
        }
      );
  }
}
