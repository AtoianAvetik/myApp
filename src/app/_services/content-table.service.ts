import { EventEmitter, Injectable, Output } from "@angular/core";

import {DataService} from "./data.service";

@Injectable()
export class ContentTableService {
  tableRowSelected = new EventEmitter<number>();
  tablesData;

  constructor(private dataService: DataService) { }

  addRow(tableIndex, row) {
    this.tablesData[tableIndex].content.push(row);
  }

  deleteRow(tableIndex, rowIndex) {
    this.tablesData[tableIndex].content.splice(rowIndex, 1);
  }

  editRow(tableIndex, rowIndex, row) {
    this.tablesData[tableIndex].content[rowIndex] = row;
  }
}
