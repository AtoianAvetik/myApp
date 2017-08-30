import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ContentListService {
  listItemSelected = new Subject<number>();
  listSelected = new Subject<number>();
  viewTypeChanged = new Subject<string>();
  editSelectedItem = new Subject();
  deleteSelectedItem = new Subject();
  listChanged = new Subject();

  constructor() { }
}
