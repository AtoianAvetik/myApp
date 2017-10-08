import { Component, OnInit, ViewChild } from '@angular/core';

import { ContentListService } from '../../_services/content-list.service';
import { DataService } from '../../_services/data.service';
import { ModalService } from '../../_services/modal.service';
import { AppService } from '../../_services/app.service';
import { PasswordCategory } from '../../_models/password-category.model';
import { AddMenuItem } from '../../_models/add-menu-item.model';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss']
})
export class PasswordsComponent implements OnInit {
  @ViewChild('folderForm') folderFormCmp;
  @ViewChild('passwordForm') passwordFormCmp;
  @ViewChild('searchImageForm') searchImageFormCmp;
  foldersData: {[name: string]: PasswordCategory};
  folders: Array<any>;
  foldersIdArray: Array<any>;
  isFoldersOpened = false;
  passwordMode = 'add';
  folderMode = 'add';
  deleteMode = '';
  activeViewType = 'list';
  listSelectedId: number;
  listItemSelectedIndex: number;
  addMenuItemsArray: Array<AddMenuItem>;
  selectedImage = null;

  constructor(private dataService: DataService,
              private contentListService: ContentListService,
              private appService: AppService,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.initForms();
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
    this.contentListService.listItemSelected
      .subscribe(
        (index: number) => {
          this.listItemSelectedIndex = index;
        }
      );
    this.contentListService.editSelectedItem
      .subscribe(
        () => {
          this.passwordMode = 'edit';
          this.passwordFormCmp.updateForm();
        }
      );
    this.contentListService.editSelectedList
      .subscribe(
        () => {
          this.folderMode = 'edit';
          this.folderFormCmp.updateForm();
        }
      );
    this.contentListService.deleteSelectedItem
      .subscribe(
        () => {
          this.deleteMode = 'password';
        }
      );
    this.contentListService.deleteSelectedList
      .subscribe(
        () => {
          this.deleteMode = 'folder';
        }
      );
    this.modalService.modalClosingDidDone
      .subscribe(
        () => {
          if ( !this.modalService.activeModals.length ) {
            this.resetForms();
          }
        }
      );
    this.addMenuItemsArray = [
      {id: 'item-modal', name: 'Add password', icon: 'add-site'},
      {id: 'folder-modal', name: 'Add folder', icon: 'folder-add'}
    ];
  }

  updateFolders(data: any) {
    this.foldersData = data.categories;
    this.folders = data.categoriesArray;
    this.foldersIdArray = data.categoriesIdArray;
  }

  initForms() {
    this.passwordFormCmp.initForm();
    this.folderFormCmp.initForm();
    this.searchImageFormCmp.initForm();
  }

  testInit() {
    console.log( this.passwordFormCmp.form );
  }

  resetForms() {
    this.folderMode = '';
    this.passwordMode = '';
    this.deleteMode = '';
    this.selectedImage = null;

    this.passwordFormCmp.reset();
    this.folderFormCmp.reset();
    this.searchImageFormCmp.reset();
  }

  toggleGroups() {
    this.appService.toogleAccordionsChange.next(this.isFoldersOpened);
  }

  changeViewType(type: string) {
    this.activeViewType = type;
    this.contentListService.viewTypeChanged.next(type);
  }

  editFolders() {
    console.log( '1' );
  }

  selectImage() {
    this.passwordFormCmp.uploadImage(this.searchImageFormCmp.getSelectedImage())
  }

  deleteItem() {
    this.dataService.deletePassword(this.listSelectedId, this.listItemSelectedIndex);
    this.modalService.closeAll();
  }

  deleteFolder() {
    this.dataService.deletePasswordCategory(this.foldersData[this.listSelectedId]);
    this.modalService.closeAll();
  }

  addMenuClicked(data) {
    const id = data.id;
    this.passwordMode = 'add';
    this.folderMode = 'add';
    this.modalService.modalWillOpened.next(id);
  }
}
