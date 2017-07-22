import {Component, Input, OnInit} from '@angular/core';

import { PassItem } from '../../../_models/pass-item.model';
import { PassItemService } from '../../../_services/pass-item.service';

@Component({
  selector: '[pass-list-item]',
  templateUrl: './pass-list-item.component.html',
  styleUrls: ['./pass-list-item.component.scss']
})
export class PassListItemComponent implements OnInit {
  @Input() passItem: PassItem;
  @Input() id: number;

  constructor(private passItemService: PassItemService) { }

  ngOnInit() {
  }

  onSelectPassItem(id: number) {
    this.passItemService.selectedPassItem.emit(id);
  }

  setItem() {
    this.passItemService.onEditedPassItem();
  }

}
