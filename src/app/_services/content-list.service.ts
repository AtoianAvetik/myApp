import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ContentListService {
  listItemSelected = new Subject<number>();
  listSelected = new Subject<number>();
  editSelectedItem = new Subject();
  deleteSelectedItem = new Subject();
  listsData;

  constructor() { }

  addItem(listIndex, item) {
    this.listsData[listIndex].content.push(item);
  }

  deleteItem(listIndex, itemIndex) {
    this.listsData[listIndex].content.splice(itemIndex, 1);
  }

  editItem(listIndex, itemIndex, item) {
    this.listsData[listIndex].content[itemIndex] = item;
  }

  addList(list) {
    this.listsData.push(list);
  }
}
