import { Component, Input, OnInit } from '@angular/core';

import { ContentListService } from "../../../_services/content-list.service";
import { ModalService } from "../../../_services/modal.service";
import { AppService } from "../../../_services/app.service";
import { logger } from 'codelyzer/util/logger';

@Component({
  selector: '[content-list-item]',
  templateUrl: './content-list-item.component.html',
  styleUrls: ['./content-list-item.component.scss']
})
export class ContentListItemComponent implements OnInit {
  @Input() listIndex;
  @Input() itemIndex;
  @Input() activeViewType: string = 'list';
  @Input() isItemSelected: boolean = false;
  @Input() isItemFocused: boolean = false;

  constructor(private contentListService: ContentListService,
              private modalService: ModalService,
              private appService: AppService) { }

  ngOnInit() {
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

  onEditItem() {
    this.contentListService.editSelectedItem.next();
  }

  onDeleteItem() {
    this.contentListService.deleteSelectedItem.next();
  }

  onFocusItem() {
    this.isItemFocused = true;
    this.contentListService.listItemSelected.next(this.itemIndex);
    this.contentListService.listSelected.next(this.listIndex);
  }

  onSelectedItem() {
    this.isItemSelected = !this.isItemSelected;
    this.contentListService.listItemSelected.next(this.itemIndex);
    this.contentListService.listSelected.next(this.listIndex);
    console.log( this.listIndex + ' - ' + this.itemIndex );
  }

  stopPropagation(event) {
    event.stopPropagation();
  }
}
