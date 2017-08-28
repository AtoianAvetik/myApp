import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  @ViewChild('select') select: SelectComponent;
  foldersData;
  folders: Array<any> = [];
  isFoldersOpened = false;
  openAllChanged = new Subject<boolean>();
  isAddPasswordMode = false;
  isEditPasswordMode = false;
  isDeletePasswordMode = false;
  isAddFolderMode = false;
  isEditFolderMode = false;
  isDeleteFolderMode = false;
  folderSelected = new Subject<number>();
  listSelectedIndex: number;
  listItemSelectedIndex: number;
  activeViewType: string = 'list';

  passwordForm: FormGroup;
  folderForm: FormGroup;


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
    this.folderSelected
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
          this.isEditPasswordMode = true;
          this.initForms();
        }
      );
    this.contentListService.deleteSelectedItem
      .subscribe(
        () => {
          this.isDeletePasswordMode = true;
          this.initForms();
        }
      );
    this.initForms();
  }

  resetForms() {
    this.isAddPasswordMode = false;
    this.isEditPasswordMode = false;
    this.isDeletePasswordMode = false;
    this.isAddFolderMode = false;
    this.isEditFolderMode = false;
    this.isDeleteFolderMode = false;

    this.passwordForm.reset();
    this.folderForm.reset();
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

  onSubmit() {
    const newPassword = {
      serviceName: this.passwordForm.get('serviceName').value,
      url: this.passwordForm.get('url').value,
      userName: this.passwordForm.get('userName').value,
      email: this.passwordForm.get('email').value,
      pass: this.passwordForm.get('pass').value
    };

    if ( this.isAddPasswordMode ) {
      this.contentListService.addItem(this.listSelectedIndex, newPassword);
    }
    if ( this.isEditPasswordMode ) {
      this.contentListService.editItem(this.listSelectedIndex, this.listItemSelectedIndex, newPassword);
    }
    if ( this.isDeletePasswordMode ) {
      this.contentListService.deleteItem(this.listSelectedIndex, this.listItemSelectedIndex);
    }

    if ( this.isAddFolderMode ) {
      const folderName = this.folderForm.get('folderName').value;
      const folder = {
        folderName: folderName,
        content: []
      };

      this.addFolderToList(folderName);
      this.contentListService.addList(folder);
    }
    if ( this.isEditFolderMode ) {
    }
    if ( this.isDeleteFolderMode ) {
    }

    this.resetForms();
  }

  private initForms() {
    let serviceName = '';
    let url = '';
    let userName = '';
    let email = '';
    let pass = '';
    let folderName = '';

    if ( this.isEditPasswordMode ) {
      const selectedPassword = this.foldersData[this.listSelectedIndex].content[this.listItemSelectedIndex];
      serviceName = selectedPassword.serviceName;
      url = selectedPassword.url;
      userName = selectedPassword.userName;
      email = selectedPassword.email;
      pass = selectedPassword.pass;
    }
    if ( this.isEditFolderMode ) {
      folderName = this.folders[this.listSelectedIndex];
    }

    this.passwordForm = new FormGroup({
      'serviceName': new FormControl(serviceName, Validators.required),
      'url': new FormControl(url, Validators.required),
      'userName': new FormControl(userName, Validators.required),
      'email': new FormControl(email, Validators.required),
      'pass': new FormControl(pass, Validators.required),
    });

    this.folderForm = new FormGroup({
      'folderName': new FormControl(folderName, Validators.required)
    });
  }
}
