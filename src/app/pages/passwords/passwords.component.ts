import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';

import { AccordionService } from '../../_services/accordion.service';
import { ContentListService } from '../../_services/content-list.service';
import { DataService } from '../../_services/data.service';
import {ModalService} from "../../_services/modal.service";

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss'],
  providers: [AccordionService]
})
export class PasswordsComponent implements OnInit {
  @ViewChild('folderNameInput') folderNameInputRef: ElementRef;
  @ViewChild('serviceNameInput') serviceNameInputRef: ElementRef;
  @ViewChild('userNameInput') userNameInputRef: ElementRef;
  @ViewChild('emailInput') emailInputRef: ElementRef;
  @ViewChild('linkInput') linkInputRef: ElementRef;
  @ViewChild('passInput') passInputRef: ElementRef;
  foldersData;
  folders: Array<any> = [];
  isFoldersOpened = false;
  isAddItem: boolean = false;
  isEditItem: boolean = false;
  folderSelected = new EventEmitter<number>();
  listSelectedIndex: number;
  listItemSelectedIndex: number;
  activeViewType: string = 'list';

  constructor(private accordionService:  AccordionService,
              private dataService: DataService,
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
    this.contentListService.addItem(this.listSelectedIndex, this.getInputs());
    this.clearInputs();
  }

  onEditPassItem() {
    this.contentListService.editItem(this.listSelectedIndex, this.listItemSelectedIndex, this.getInputs());
    this.clearInputs();
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
