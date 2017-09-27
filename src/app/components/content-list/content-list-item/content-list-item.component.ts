import { Component, Input, OnInit } from '@angular/core';

import { ContentListService } from "../../../_services/content-list.service";
import { ModalService } from "../../../_services/modal.service";
import { AppService } from "../../../_services/app.service";

@Component({
  selector: '[content-list-item]',
  templateUrl: './content-list-item.component.html',
  styleUrls: ['./content-list-item.component.scss']
})
export class ContentListItemComponent implements OnInit {
  @Input() listId;
  @Input() itemIndex;
  @Input() itemImg;
  activeViewType: string = 'list';
  isItemSelected: boolean = false;
  isItemFocused: boolean = false;

  constructor(private contentListService: ContentListService,
              private modalService: ModalService,
              private appService: AppService) { }

  ngOnInit() {
    this.contentListService.viewTypeChanged
      .subscribe(
        (type: string) => {
          this.activeViewType = type;
        }
      );
    this.appService.appWrapClicked
      .subscribe(
        () => {
          this.isItemSelected = false;
          this.isItemFocused = false;
        }
      );
    this.modalService.isModalClosed
      .subscribe(
        () => {
          this.isItemFocused = false;
        }
      );
  }

  onEditItem(event) {
    this.stopPropagation(event);
    this.onFocusItem();
    this.contentListService.editSelectedItem.next();
  }

  onDeleteItem(event) {
    this.stopPropagation(event);
    this.onFocusItem();
    this.contentListService.deleteSelectedItem.next();
  }

  onSelectedItem(event) {
    this.stopPropagation(event);
    this.isItemSelected = !this.isItemSelected;
    this.contentListService.listItemSelected.next(this.itemIndex);
    this.contentListService.listSelected.next(this.listId);
  }

  onFocusItem() {
    this.isItemFocused = true;
    this.contentListService.listItemSelected.next(this.itemIndex);
    this.contentListService.listSelected.next(this.listId);
  }

  stopPropagation(event) {
    event.stopPropagation();
  }
}
