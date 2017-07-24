import {Component, Input, OnInit} from '@angular/core';
import {ContentListService} from "../../../_services/content-list.service";

@Component({
  selector: 'app-content-list-item',
  templateUrl: './content-list-item.component.html',
  styleUrls: ['./content-list-item.component.scss']
})
export class ContentListItemComponent implements OnInit {
  @Input() item;
  @Input() listIndex;
  @Input() itemIndex;
  isItemSelected: boolean = false;

  constructor(private contentListService: ContentListService) { }

  ngOnInit() {
  }

  onEditItem() {
    this.contentListService.editSelectedItem.emit();
  }

  onSelectedItem() {
    this.contentListService.listItemSelected.emit(this.itemIndex);
    this.contentListService.listSelected.emit(this.listIndex);
  }

}
