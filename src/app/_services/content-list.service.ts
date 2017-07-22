import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ContentListService {
  listItemSelected = new EventEmitter<number>();
  listsData;

  constructor() { }

  addItem(listIndex, row) {
    this.listsData[listIndex].content.push(row);
  }

  deleteItem(listIndex, rowIndex) {
    this.listsData[listIndex].content.splice(rowIndex, 1);
  }

  editItem(listIndex, itemIndex, row) {
    this.listsData[listIndex].content[itemIndex] = row;
  }

  addList(list) {
    this.listsData.push(list);
  }
}
