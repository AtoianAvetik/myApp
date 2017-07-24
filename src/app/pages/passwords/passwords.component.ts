import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';

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
  isAddItem: boolean = false;
  isEditItem: boolean = false;
  @ViewChild('folderNameInput') folderNameInputRef: ElementRef;
  @ViewChild('serviceNameInput') serviceNameInputRef: ElementRef;
  @ViewChild('userNameInput') userNameInputRef: ElementRef;
  @ViewChild('emailInput') emailInputRef: ElementRef;
  @ViewChild('linkInput') linkInputRef: ElementRef;
  @ViewChild('passInput') passInputRef: ElementRef;
  folderSelected = new EventEmitter<number>();
  foldersData;
  folders: Array<any> = [];
  listSelectedIndex: number;
  listItemSelectedIndex: number;

  constructor(private accordionService:  AccordionService, private dataService: DataService, private contentListService: ContentListService) { }

  ngOnInit() {
    this.foldersData = this.contentListService.listsData = this.dataService.getPasswordsData();
    this.foldersData.forEach((folder, index) => {
      this.folders.push({id: index + 1, text: folder.folderName});
    });
    this.contentListService.listSelected
      .subscribe(
        (index: number) => {
          this.listSelectedIndex = index;
        }
      );
    this.contentListService.listItemSelected
      .subscribe(
        (index: number) => {
          this.listItemSelectedIndex = index;
        }
      );
    this.contentListService.editSelectedItem
      .subscribe(
        () => {
          this.isEditItem = true;
          this.serviceNameInputRef.nativeElement.value = this.foldersData[this.listSelectedIndex].content[this.listItemSelectedIndex].serviceName;
          this.userNameInputRef.nativeElement.value = this.foldersData[this.listSelectedIndex].content[this.listItemSelectedIndex].userName;
          this.emailInputRef.nativeElement.value = this.foldersData[this.listSelectedIndex].content[this.listItemSelectedIndex].email;
          this.linkInputRef.nativeElement.value = this.foldersData[this.listSelectedIndex].content[this.listItemSelectedIndex].url;
          this.passInputRef.nativeElement.value = this.foldersData[this.listSelectedIndex].content[this.listItemSelectedIndex].pass;
        }
      );
    this.folderSelected
      .subscribe(
        (index: number) => {
          this.listSelectedIndex = index;
        }
      );

  }

  toggleGroups() {
    this.accordionService.openAllChanged.emit(this.isFoldersOpened);
  }

  onSelectTable(data) {
    this.folderSelected.emit(data.id - 1);
  }

  addEmptyFolder() {
    const folderName = this.folderNameInputRef.nativeElement.value;
    const folder = {
      folderName: folderName,
      content: []
    };

    this.contentListService.addList(folder);
  }

  onAddPassItem() {
    const serviceName = this.serviceNameInputRef.nativeElement.value;
    const userName = this.userNameInputRef.nativeElement.value;
    const email = this.emailInputRef.nativeElement.value;
    const link = this.linkInputRef.nativeElement.value;
    const pass = this.passInputRef.nativeElement.value;
    const item = {
      serviceName: serviceName,
      url: link,
      userName: userName,
      email: email,
      pass: pass
    };

    this.contentListService.addItem(this.listSelectedIndex, item);
  }

  onEditPassItem() {
    const serviceName = this.serviceNameInputRef.nativeElement.value;
    const userName = this.userNameInputRef.nativeElement.value;
    const email = this.emailInputRef.nativeElement.value;
    const link = this.linkInputRef.nativeElement.value;
    const pass = this.passInputRef.nativeElement.value;
    const item = {
      serviceName: serviceName,
      url: link,
      userName: userName,
      email: email,
      pass: pass
    };

    this.contentListService.editItem(this.listSelectedIndex, this.listItemSelectedIndex, item);
  }

  onDeletePassItem() {
    this.contentListService.deleteItem(this.listSelectedIndex, this.listItemSelectedIndex);
  }
}
