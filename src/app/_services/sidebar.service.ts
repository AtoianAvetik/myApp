import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidebarService {
  toogleSidebarChange = new Subject<boolean>();
  private _isExpand = true;

  constructor() {
    this.toogleSidebarChange
      .subscribe(
        (status) => {
          this.isExpand = status;
        }
      );
  }

  @Input()
  set isExpand(value: boolean) {
    this._isExpand = value;
  }

  get isExpand() {
    return this._isExpand;
  }
}
