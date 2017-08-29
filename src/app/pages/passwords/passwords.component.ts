import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { SelectComponent } from 'ng2-select/ng2-select';

import { ContentListService } from '../../_services/content-list.service';
import { DataService } from '../../_services/data.service';
import { ModalService } from '../../_services/modal.service';
import { AppService } from '../../_services/app.service';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss']
})
export class PasswordsComponent implements OnInit {
  @ViewChild('select') select: SelectComponent;
  foldersData;
  folderSelected = new Subject<number>();
  isFoldersOpened = false;

  isAddPasswordMode = false;
  isEditPasswordMode = false;
  isDeletePasswordMode = false;
  isAddFolderMode = false;
  isEditFolderMode = false;
  isDeleteFolderMode = false;

  activeViewType = 'list';
  folderSelectedId: number;
  listItemSelectedIndex: number;

  passwordForm: FormGroup;
  folderForm: FormGroup;

  constructor(private dataService: DataService,
              private contentListService: ContentListService,
              private appService: AppService,
              private modalService: ModalService) { }

  ngOnInit() {
    this.foldersData = this.contentListService.listsData = this.dataService.getPasswordsData();
    this.dataService.passwordsDataChanged
      .subscribe(
        (data: any) => {
          this.foldersData = this.contentListService.listsData = data;
        }
      );
    this.contentListService.listSelected
      .subscribe(
        (id: number) => {
          this.folderSelectedId = id;
        }
      );
    this.folderSelected
      .subscribe(
        (id: number) => {
          this.folderSelectedId = id;
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
    this.appService.toogleAccordionsChange.next(this.isFoldersOpened);
  }

  onSelectTable(data) {
    this.folderSelected.next(data.id);
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
      this.contentListService.addItem(this.folderSelectedId, newPassword);
    }
    if ( this.isEditPasswordMode ) {
      this.contentListService.editItem(this.folderSelectedId, this.listItemSelectedIndex, newPassword);
    }
    if ( this.isDeletePasswordMode ) {
      this.contentListService.deleteItem(this.folderSelectedId, this.listItemSelectedIndex);
    }

    if ( this.isAddFolderMode ) {
      const folderName = this.folderForm.get('folderName').value;
      const id = parseInt(this.foldersData.categories[this.foldersData.categories.length - 1].id) + 1;
      const folder = {
        id: id,
        name: folderName,
        content: [],
        parentCategory: [],
        childCategories: []
      };

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
      const selectedPassword = this.foldersData.content[this.folderSelectedId][this.listItemSelectedIndex];
      serviceName = selectedPassword.serviceName;
      url = selectedPassword.url;
      userName = selectedPassword.userName;
      email = selectedPassword.email;
      pass = selectedPassword.pass;
    }
    if ( this.isEditFolderMode ) {
      // folderName = this.foldersData.folders.find(function (folder) {
      //   // return folder.id === id;
      // });
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
