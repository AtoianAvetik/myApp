import {Component, HostBinding, Input} from '@angular/core';

import {ModalService} from "../../_services/modal.service";
import {ContentTableService} from "../../_services/content-table.service";

@Component({
  selector: '[content-table-row]',
  templateUrl: './content-table-row.component.html',
  styleUrls: ['./content-table-row.component.scss']
})
export class ContentTableRowComponent {
  @Input() item;
  @Input() tableRowIndex;
  @HostBinding('attr.class') class = 'page-content-table_row';

  constructor(private modalService: ModalService, private contentTableService: ContentTableService) { }

  onSelectTableRow() {
    this.contentTableService.tableRowSelected.emit(this.tableRowIndex);
  }

  openModal(id: string) {
    this.modalService.modalOpened.emit(id);
  }
}
