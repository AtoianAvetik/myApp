import { Component, DoCheck, Input, OnInit } from '@angular/core';

import { ContentListService } from '../../../_services/content-list.service';
import { PasswordCategory } from '../../../_models/password-category.model';

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

  constructor(private contentListService: ContentListService) { }

  ngOnInit() {
    this.contentListService.viewTypeChanged
      .subscribe(
        (type: string) => {
          this.activeViewType = type;
        }
      );
  }

  ngDoCheck() {
    this.updateFolders();
  }

  updateFolders() {
    this.curLevelList = [];

    this.foldersList.forEach((folderId) => {
      if (this.isChildComponent || !this.foldersData[folderId].parentCategory) {
        this.curLevelList.push(folderId);
      }
    });
  }
}
