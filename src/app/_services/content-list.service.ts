import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ContentListService {
  listItemSelected = new EventEmitter<number>();
  listSelected = new EventEmitter<number>();
  editSelectedItem = new EventEmitter();
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
