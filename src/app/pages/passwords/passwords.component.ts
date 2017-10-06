import { Component, OnInit, ViewChild } from '@angular/core';

import { ContentListService } from '../../_services/content-list.service';
import { DataService } from '../../_services/data.service';
import { ModalService } from '../../_services/modal.service';
import { AppService } from '../../_services/app.service';
import { PasswordCategory } from '../../_models/password-category.model';
import { AddMenuItem } from '../../_models/add-menu-item.model';
import { GetLogoService } from '../../_services/get-logo.service';
import { LoaderService } from '../../_services/loader.service';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss']
})
export class PasswordsComponent implements OnInit {
  @ViewChild('folderForm') folderFormCmp;
  @ViewChild('passwordForm') passwordFormCmp;
  foldersData: {[name: string]: PasswordCategory};
  folders: Array<any>;
  foldersIdArray: Array<any>;
  isFoldersOpened = false;

  passwordMode: string = 'add';
  folderMode: string = 'add';

  activeViewType = 'list';
  listSelectedId: number;
  listItemSelectedIndex: number;

  addMenuItemsArray: Array<AddMenuItem>;
  passwordsImageArray = [
    'https://www.google.com.ua/favicon.ico',
    'https://www.google.com.ua/favicon.ico',
    'https://www.google.com.ua/favicon.ico',
    'https://www.google.com.ua/favicon.ico'
  ];
  selectedImage = null;
  getImagesLoader;

  constructor(private dataService: DataService,
              private contentListService: ContentListService,
              private appService: AppService,
              private modalService: ModalService,
              private getLogo: GetLogoService,
              private loaderService: LoaderService) {
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
    this.contentListService.deleteSelectedItem
      .subscribe(
        () => {
          this.passwordMode = 'delete';
        }
      );
    this.modalService.modalClosingDidDone
      .subscribe(
        () => {
          this.resetForms();
        }
      );
    this.getLogo.loaded
      .subscribe(
        (data: any) => {
          if ( data instanceof Array ) {
            for (let i = 0; i < data.length; i++) {
              this.passwordsImageArray.push(data[i].url);
              (i === data.length - 1) && this.getImagesLoader.dismiss();
            }
          }
        },
        (error: any) => {
          console.error(error);
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
  }

  testInit() {
    // this.passwordFormCmp.initForm();
    console.log( this.passwordFormCmp.form );
  }

  resetForms() {
    // this.mode = 'add';
    this.selectedImage = null;

    this.passwordFormCmp.reset();
    this.folderFormCmp.reset();
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

  deleteItem() {
    this.dataService.deletePassword(this.listSelectedId, this.listItemSelectedIndex);
  }

  updateImagesArray() {
    this.passwordsImageArray = [];
    this.getImagesLoader = this.loaderService.create({
      id: 'getImages'
    });

    let sub = this.getImagesLoader.present().subscribe(
      () => {
        this.getLogo.getSiteLogoArray(this.passwordFormCmp.get('url').value, 6);
        sub.unsubscribe();
      }
    );
  }

  selectPreviewImage(image) {
    this.passwordFormCmp.selectPreviewImage(image);
  }

  addMenuClicked(data) {
    const id = data.id;
    this.passwordMode = 'add';
    this.folderMode = 'add';
    this.modalService.modalWillOpened.next(id);
  }
}
