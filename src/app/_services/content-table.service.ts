import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ContentTableService {
  tableRowSelected = new EventEmitter<number>();
  tablesData;

  constructor() { }

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
