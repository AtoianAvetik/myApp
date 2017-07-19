import {EventEmitter, Injectable, OnInit} from '@angular/core';

import { PassItem } from '../_models/pass-item.model';
import { DataService } from './data.service';

@Injectable()
export class PassItemService implements OnInit {
  passItemsChanged = new EventEmitter<PassItem[]>();
  selectedPassItem = new EventEmitter<number>();
  setEditedPassItem = new EventEmitter<PassItem>();

  private passItems: PassItem[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  getPassItems() {
    return this.passItems = this.dataService.getPassItems();
  }

  addPassItem(passItem: PassItem) {
    this.passItems.push(passItem);
    this.passItemsChanged.emit(this.passItems.slice());
  }

  updatePassItem(id: number, passItem: PassItem) {
    this.passItems[id] = passItem;
    this.passItemsChanged.emit(this.passItems.slice());
  }

  deletePassItem(id: number) {
    this.passItems.splice(id, 1);
    this.passItemsChanged.emit(this.passItems.slice());
  }

  onEditedPassItem() {
    this.setEditedPassItem.emit();
  }
}
