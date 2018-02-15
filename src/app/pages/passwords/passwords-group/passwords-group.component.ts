import { Component, DoCheck, Input, OnInit } from '@angular/core';

import { PasswordCategory } from '../../../shared/_models/password-category.model';
import { SmartListService } from '../../../components/smart-list/smart-list.service';

@Component({
  selector: 'app-passwords-group',
  templateUrl: './passwords-group.component.html',
  styleUrls: ['./passwords-group.component.scss']
})
export class PasswordsGroupComponent implements OnInit, DoCheck {
  @Input() foldersData: {[name: string]: PasswordCategory};
  @Input() foldersList: Array<any>;
  @Input() isChildComponent = false;
  curLevelList = [];
  activeViewType = 'list';

  constructor(private _smartListService: SmartListService) { }

  ngOnInit() {
    this._smartListService.viewTypeChanged
      .subscribe(
        (type: string) => {
          this.activeViewType = type;
        }
      );
  }

  ngDoCheck() {
    this.foldersList && this.updateFolders();
  }

  updateFolders() {
    this.curLevelList = [];

    this.foldersList.forEach((folderId) => {
      if (this.isChildComponent || !this.foldersData[folderId].parentCategory) {
        this.curLevelList.push(folderId);
      }
    });
  }

  onEditFolder(folderId) {
    this.selectFolder(folderId);
    this._smartListService.editSelectedList.next();
  }

  onDeleteFolder(folderId) {
    this.selectFolder(folderId);
    this._smartListService.deleteSelectedList.next();
  }

  selectFolder(folderId) {
    this._smartListService.listSelected.next(folderId);
  }
}
