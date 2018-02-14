import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { ContentListService } from "../../../shared/_services/content-list.service";
import { ModalService } from "../../modals/modal.service";
import { AppService } from "../../../shared/_services/app.service";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: '[content-list-item]',
  templateUrl: './content-list-item.component.html',
  styleUrls: ['./content-list-item.component.scss']
})
export class ContentListItemComponent implements OnInit, OnDestroy {
  @Input() listId;
  @Input() itemIndex;
  @Input() itemImg;
  activeViewType: string = 'list';
  isItemSelected: boolean = false;
  isItemFocused: boolean = false;
  private subscriptions: Array<Subscription> = [];

  constructor(private contentListService: ContentListService,
              private modalService: ModalService,
              private appService: AppService) { }

  ngOnInit() {
    this.subscriptions.push(this.contentListService.viewTypeChanged.subscribe(
      (type: string) => {
        this.activeViewType = type;
      }
    ));
    this.subscriptions.push(this.appService.appWrapClicked.subscribe(
      () => {
        this.isItemSelected = false;
        this.isItemFocused = false;
      }
    ));
    this.subscriptions.push(this.modalService.modalClosingDidStart.subscribe(
      () => {
        this.isItemFocused = false;
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
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
