import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { SelectComponent } from 'ng2-select/ng2-select';

import { ContentListService } from '../../_services/content-list.service';
import { DataService } from '../../_services/data.service';
import { ModalService } from '../../_services/modal.service';
import { AppService } from '../../_services/app.service';
import { PasswordCategory } from '../../_models/password-category.model';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss']
})
export class PasswordsComponent implements OnInit {
  @ViewChild('select') select: SelectComponent;
  foldersData: {[name: string]: PasswordCategory};
  folders: Array<any>;
  foldersIdArray: Array<any>;
  folderSelected = new Subject<number>();
  isFoldersOpened = false;

  isAddPasswordMode = false;
  isEditPasswordMode = false;
  isTransferPasswordMode = false;
  isDeletePasswordMode = false;
  isAddFolderMode = false;
  isEditFolderMode = false;
  isDeleteFolderMode = false;

  activeViewType = 'list';
  listSelectedId: number;
  folderSelectedId: number;
  activeFolder: Array<any> = [];
  listItemSelectedIndex: number;

  passwordForm: FormGroup;
  folderForm: FormGroup;

  constructor(private dataService: DataService,
              private contentListService: ContentListService,
              private appService: AppService,
              private modalService: ModalService) { }

  ngOnInit() {
    this.updateFolders(this.dataService.getPasswordsData());
    this.dataService.passwordsDataChanged
      .subscribe(
        (data: any) => {
          this.updateFolders(data);
        }
      );
    this.contentListService.listSelected
      .subscribe(
        (id: number) => {
          this.listSelectedId = id;
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
    this.modalService.isModalClosed
      .subscribe(
        () => {
          this.resetForms();
        }
      );
    this.initForms();
  }

  updateFolders(data: any) {
    this.foldersData = data.categories;
    this.folders = data.categoriesArray;
    this.foldersIdArray = data.categoriesIdArray;
  }

  resetForms() {
    this.isAddPasswordMode = false;
    this.isEditPasswordMode = false;
    this.isDeletePasswordMode = false;
    this.isAddFolderMode = false;
    this.isEditFolderMode = false;
    this.isDeleteFolderMode = false;
    this.isTransferPasswordMode = false;

    this.passwordForm.reset();
    this.folderForm.reset();
  }

  toggleGroups() {
    this.appService.toogleAccordionsChange.next(this.isFoldersOpened);
  }

  changeViewType(type: string) {
    this.activeViewType = type;
    this.contentListService.viewTypeChanged.next(type);
  }

  onSelectTable(data) {
    this.folderSelected.next(data.id);

    if ( this.isEditPasswordMode ) {
      this.isTransferPasswordMode = true;
    }

    if ( this.folderSelectedId === this.listSelectedId ) {
      this.isTransferPasswordMode = false;
    }
  }

  onSubmit() {
    const newPassword = {
      serviceName: this.passwordForm.get('serviceName').value,
      url: this.passwordForm.get('url').value,
      userName: this.passwordForm.get('userName').value,
      email: this.passwordForm.get('email').value,
      pass: this.passwordForm.get('pass').value,
      desc: this.passwordForm.get('desc').value
    };

    if ( this.isAddPasswordMode ) {
      this.dataService.addPassword(this.folderSelectedId, newPassword);
    }
    if ( this.isEditPasswordMode ) {
      if ( this.isTransferPasswordMode ) {
        this.dataService.transferPassword(this.listSelectedId, this.folderSelectedId, this.listItemSelectedIndex, newPassword);
      } else {
        this.dataService.editPassword(this.listSelectedId, this.listItemSelectedIndex, newPassword);
      }
    }
    if ( this.isDeletePasswordMode ) {
      this.dataService.deletePassword(this.listSelectedId, this.listItemSelectedIndex);
    }

    if ( this.isAddFolderMode ) {
      const folderName = this.folderForm.get('folderName').value.toString();
      const id = (parseInt(this.foldersIdArray[this.foldersIdArray.length - 1]) + 1).toString();

      const folder = new PasswordCategory(id, folderName, [], [], []);
      this.dataService.addPasswordCategory(folder);
    }
    if ( this.isEditFolderMode ) {
    }
    if ( this.isDeleteFolderMode ) {
    }
  }

  private initForms() {
    let serviceName = '';
    let url = '';
    let userName = '';
    let email = '';
    let pass = '';
    let desc = '';
    let folderName = '';

    if ( this.isEditPasswordMode ) {
      const selectedPassword = this.foldersData[this.listSelectedId].content[this.listItemSelectedIndex];
      serviceName = selectedPassword.serviceName;
      url = selectedPassword.url;
      userName = selectedPassword.userName;
      email = selectedPassword.email;
      pass = selectedPassword.pass;
      desc = selectedPassword.desc;

      this.activeFolder= [this.folders[this.listSelectedId - 1]];
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
      'desc': new FormControl(desc),
    });

    this.folderForm = new FormGroup({
      'folderName': new FormControl(folderName, Validators.required)
    });

    console.log( this.passwordForm );
  }
}
