import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SelectComponent } from 'ng2-select/ng2-select';

import { ContentListService } from '../../_services/content-list.service';
import { DataService } from '../../_services/data.service';
import { ModalService } from '../../_services/modal.service';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss']
})
export class PasswordsComponent implements OnInit {
  @ViewChild('folderNameInput') folderNameInputRef: ElementRef;
  @ViewChild('serviceNameInput') serviceNameInputRef: ElementRef;
  @ViewChild('userNameInput') userNameInputRef: ElementRef;
  @ViewChild('emailInput') emailInputRef: ElementRef;
  @ViewChild('linkInput') linkInputRef: ElementRef;
  @ViewChild('passInput') passInputRef: ElementRef;
  @ViewChild('select') select: SelectComponent;
  foldersData;
  folders: Array<any> = [];
  isFoldersOpened = false;
  openAllChanged = new Subject<boolean>();
  isAddItem: boolean = false;
  isEditItem: boolean = false;
  folderSelected = new Subject<number>();
  listSelectedIndex: number;
  listItemSelectedIndex: number;
  activeViewType: string = 'list';


  constructor(private dataService: DataService,
              private contentListService: ContentListService,
              private modalService: ModalService) { }

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
          this.setInputsSelectedItem();
        }
      );
    this.folderSelected
      .subscribe(
        (index: number) => {
          this.listSelectedIndex = index;
        }
      );
    this.modalService.isModalClosed
      .subscribe(
        () => {
          this.isEditItem = false;
          this.isAddItem = false;
        }
      );
  }

  toggleGroups() {
    this.openAllChanged.next(this.isFoldersOpened);
  }

  onSelectTable(data) {
    this.folderSelected.next(data.id - 1);
  }

  addFolderToList(folderName: string) {
    this.folders.push({id: this.folders.length + 1, text: folderName});
  }

  addEmptyFolder() {
    const folderName = this.folderNameInputRef.nativeElement.value;
    const folder = {
      folderName: folderName,
      content: []
    };

    this.addFolderToList(folderName);
    this.contentListService.addList(folder);
  }

  onAddPassItem() {
    this.contentListService.addItem(this.listSelectedIndex, this.getInputs());
  }

  onEditPassItem() {
    this.contentListService.editItem(this.listSelectedIndex, this.listItemSelectedIndex, this.getInputs());
  }

  onDeletePassItem() {
    this.contentListService.deleteItem(this.listSelectedIndex, this.listItemSelectedIndex);
  }

  getInputs() {
    let item = {
      serviceName: '',
      url: '',
      userName: '',
      email: '',
      pass: ''
    };

    item.serviceName = this.serviceNameInputRef.nativeElement.value;
    item.userName = this.userNameInputRef.nativeElement.value;
    item.email = this.emailInputRef.nativeElement.value;
    item.url = this.linkInputRef.nativeElement.value;
    item.pass = this.passInputRef.nativeElement.value;

    return item;
  }

  setInputsSelectedItem() {
    this.serviceNameInputRef.nativeElement.value = this.foldersData[this.listSelectedIndex].content[this.listItemSelectedIndex].serviceName;
    this.userNameInputRef.nativeElement.value = this.foldersData[this.listSelectedIndex].content[this.listItemSelectedIndex].userName;
    this.emailInputRef.nativeElement.value = this.foldersData[this.listSelectedIndex].content[this.listItemSelectedIndex].email;
    this.linkInputRef.nativeElement.value = this.foldersData[this.listSelectedIndex].content[this.listItemSelectedIndex].url;
    this.passInputRef.nativeElement.value = this.foldersData[this.listSelectedIndex].content[this.listItemSelectedIndex].pass;
  }

  clearInputs() {
    this.serviceNameInputRef.nativeElement.value = '';
    this.userNameInputRef.nativeElement.value = '';
    this.emailInputRef.nativeElement.value = '';
    this.linkInputRef.nativeElement.value = '';
    this.passInputRef.nativeElement.value = '';
  }
}
