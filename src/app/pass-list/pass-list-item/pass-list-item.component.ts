import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { PassItem } from '../../_models/pass-item.model';
import { ModalService } from '../../_services/modal.service';
import { PassItemService } from '../../_services/pass-item.service';

@Component({
  selector: '[pass-list-item]',
  templateUrl: './pass-list-item.component.html',
  styleUrls: ['./pass-list-item.component.scss']
})
export class PassListItemComponent implements OnInit {
  @Input() passItem: PassItem;
  @Input() id: number;

  constructor(private modalService: ModalService, private passItemService: PassItemService) { }

  ngOnInit() {
  }

  openModal(id: string) {
    this.modalService.modalOpened.emit(id);
  }

  onSelectPassItem(id: number) {
    this.passItemService.selectedPassItem.emit(id);
  }

  setItem() {
    this.passItemService.onEditedPassItem();
  }

}
