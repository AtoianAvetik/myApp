import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ContentListService {
  listItemSelected = new Subject<number>();
  listSelected = new Subject<number>();
  viewTypeChanged = new Subject<string>();
  editSelectedItem = new Subject();
  deleteSelectedItem = new Subject();
  listsData;

  constructor() { }

  addItem(listId, item) {
    this.listsData.categoriesData[listId].content.push(item);
  }

  deleteItem(listId, itemIndex) {
    this.listsData.categoriesData[listId].content.splice(itemIndex, 1);
  }

  editItem(listId, itemIndex, item) {
    this.listsData.categoriesData[listId].content[itemIndex] = item;
  }

  addList(list) {
    this.listsData.categories.push({
      id: list.id,
      text: list.name
    });
    this.listsData.categoriesData[list.id] = list;
  }
}
