import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { AccordionService } from '../../_services/accordion.service';
import { ContentListService } from '../../_services/content-list.service';
import { DataService } from '../../_services/data.service';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss'],
  providers: [AccordionService]
})
export class PasswordsComponent implements OnInit {
  isFoldersOpened = false;
  @ViewChild('folderNameInput') folderNameInputRef: ElementRef;
  @ViewChild('folderContentInput') folderContentInputRef: ElementRef;
  foldersData;

  constructor(private accordionService:  AccordionService, private dataService: DataService, private contentListService: ContentListService) { }

  ngOnInit() {
    this.foldersData = this.contentListService.listsData = this.dataService.getPasswordsData();
  }

  addEmptyFolder() {
    const folderName = this.folderNameInputRef.nativeElement.value;
    const folder = {
      folderName: folderName,
      content: []
    }

    this.contentListService.addList(folder);
  }

  toggleGroups() {
    this.accordionService.openAllChanged.emit(this.isFoldersOpened);
  }
}
