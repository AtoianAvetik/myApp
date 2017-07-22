import {Component, EventEmitter, OnInit} from '@angular/core';

import {ContentTableService} from '../../_services/content-table.service';
import {DataService} from '../../_services/data.service';

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.scss'],
  providers: [ContentTableService]
})
export class TestTableComponent implements OnInit {
  tableSelected = new EventEmitter<number>();
  selectedTableIndex: number;
  tablesData;
  tables: Array<any> = [];

  constructor(private contentTableService: ContentTableService, private dataService: DataService) { }

  ngOnInit() {
    this.tablesData = this.contentTableService.tablesData = this.dataService.getTablesData();

    this.tablesData.forEach((table, index) => {
      this.tables.push({id: index + 1, text: table.title, header: table.title});
    });
    this.tableSelected
      .subscribe(
        (index: number) => {
          this.selectedTableIndex = index;
        }
      );
  }

  onSelectTable(data) {
    this.tableSelected.emit(data.id - 1);
  }

  addTableRow(data) {
    this.contentTableService.addRow(this.selectedTableIndex, data);
  }
}
