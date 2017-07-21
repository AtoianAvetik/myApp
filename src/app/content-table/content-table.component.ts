import {Component, HostBinding, Injectable, Input, OnInit} from '@angular/core';

import { ModalService } from '../_services/modal.service';
import { ContentTableService } from "../_services/content-table.service";

@Component({
  selector: 'app-content-table',
  templateUrl: './content-table.component.html',
  styleUrls: ['./content-table.component.scss'],
  providers: [ModalService]
})
@Injectable()
export class ContentTableComponent implements OnInit {
  selectedTableRowIndex: number;
  @Input() data;
  @Input() tableIndex;
  @HostBinding('attr.class') class = 'page-content-table';

  constructor(private modalService: ModalService, private contentTableService: ContentTableService) { }

  ngOnInit() {
    this.contentTableService.tableRowSelected
      .subscribe(
        (index: number) => {
          this.selectedTableRowIndex = index;
        }
      );
  }

  onEditTableRow(row) {
    this.contentTableService.editRow(this.tableIndex,this.selectedTableRowIndex,row);
  }

  onDeleteTableRow() {
    this.contentTableService.deleteRow(this.tableIndex,this.selectedTableRowIndex);
  }

  openModal(id: string) {
    this.modalService.modalOpened.emit(id);
  }

  closeModal(id: string) {
    this.modalService.modalClosed.emit(id);
  }
}
