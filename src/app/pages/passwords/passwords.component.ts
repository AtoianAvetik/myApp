import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ContentListService } from '../../_services/content-list.service';
import { DataService } from '../../_services/data.service';
import { ModalService } from '../../_services/modal.service';
import { AppService } from '../../_services/app.service';
import { PasswordCategory } from '../../_models/password-category.model';
import { AddMenuItem } from '../../_models/add-menu-item.model';
import { ValidatorsService } from '../../_services/validators.service';
import { GetLogoService } from '../../_services/get-logo.service';
import { LoaderService } from '../../_services/loader.service';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss']
})
export class PasswordsComponent implements OnInit {
  foldersData: {[name: string]: PasswordCategory};
  folders: Array<any>;
  foldersIdArray: Array<any>;
  isFoldersOpened = false;

  isAddPasswordMode = false;
  isEditPasswordMode = false;
  isTransferPasswordMode = false;
  isDeletePasswordMode = false;
  isAddFolderMode = false;
  isEditFolderMode = false;
  isDeleteFolderMode = false;
  isAdditionalOptionsMode = false;

  activeViewType = 'list';
  listSelectedId: number;
  activeFolder: Array<any> = [];
  listItemSelectedIndex: number;

  passwordForm: FormGroup;
  folderForm: FormGroup;

  addMenuItemsArray: Array<AddMenuItem>;
  passwordsImageArray = [
    'https://www.google.com.ua/favicon.ico',
    'https://www.google.com.ua/favicon.ico',
    'https://www.google.com.ua/favicon.ico',
    'https://www.google.com.ua/favicon.ico'
  ];
  selectedImage = null;
  previewImage = null;
  uploadImageMode = false;
  getImagesLoader;

  constructor(private dataService: DataService,
              private contentListService: ContentListService,
              private appService: AppService,
              private modalService: ModalService,
              private getLogo: GetLogoService,
              private validatorsService: ValidatorsService,
              private loaderService: LoaderService) {
  }

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
    this.initForms();
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

  resetForms() {
    this.isAddPasswordMode = false;
    this.isEditPasswordMode = false;
    this.isDeletePasswordMode = false;
    this.isAddFolderMode = false;
    this.isEditFolderMode = false;
    this.isDeleteFolderMode = false;
    this.isTransferPasswordMode = false;
    this.isAdditionalOptionsMode = false;
    this.activeFolder = [];
    this.previewImage = [];
    this.selectedImage = null;

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

  editFolders() {
    console.log( '1' );
  }

  onSelectFolder(data) {
    let formControl: FormControl;
    if ( this.isAddPasswordMode || this.isEditPasswordMode ) {
      formControl = <FormControl>this.passwordForm.get('folderSelect');
    }
    if ( this.isAddFolderMode || this.isEditFolderMode ) {
      formControl = <FormControl>this.folderForm.get('folderSelect');
    }

    if ( this.isEditPasswordMode ) {
      this.isTransferPasswordMode = true;
    }
    if ( data.id === this.listSelectedId ) {
      this.isTransferPasswordMode = false;
    }

    formControl.markAsDirty();
    formControl.setValue([data.id]);
  }

  onSubmit() {
    const newPassword = {
      serviceName: this.passwordForm.get('serviceName').value,
      url: this.passwordForm.get('url').value,
      userName: this.passwordForm.get('userName').value,
      email: this.passwordForm.get('email').value,
      pass: this.passwordForm.get('pass').value,
      desc: this.passwordForm.get('desc').value,
      img: this.passwordForm.get('image').value
    };

    if ( this.isAddPasswordMode ) {
      this.dataService.addPassword(this.passwordForm.get('folderSelect').value, newPassword);
    }
    if ( this.isEditPasswordMode ) {
      if ( this.isTransferPasswordMode ) {
        this.dataService.transferPassword(this.listSelectedId, this.passwordForm.get('folderSelect').value, this.listItemSelectedIndex, newPassword);
      } else {
        this.dataService.editPassword(this.listSelectedId, this.listItemSelectedIndex, newPassword);
      }
    }
    if ( this.isDeletePasswordMode ) {
      this.dataService.deletePassword(this.listSelectedId, this.listItemSelectedIndex);
    }

    if ( this.isAddFolderMode ) {
      const parentFolder = this.folderForm.get('folderSelect').value ? [this.folderForm.get('folderSelect').value.toString()] : [];
      const folderName = this.folderForm.get('folderName').value.toString();
      const id = (parseInt(this.foldersIdArray[this.foldersIdArray.length - 1], 10) + 1).toString();

      const folder = new PasswordCategory(id, folderName, [], parentFolder, []);
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
    let img = '';
    let folderSelect: any = null;
    let folderName = '';

    if ( this.isEditPasswordMode ) {
      const selectedPassword = this.foldersData[this.listSelectedId].content[this.listItemSelectedIndex];
      serviceName = selectedPassword.serviceName;
      url = selectedPassword.url;
      userName = selectedPassword.userName;
      email = selectedPassword.email;
      pass = selectedPassword.pass;
      desc = selectedPassword.desc;
      img = selectedPassword.img;
      folderSelect = this.listSelectedId;

      this.activeFolder = [this.folders[this.listSelectedId - 1]];
    }
    if ( this.isEditFolderMode ) {
      // folderName = this.foldersData.folders.find(function (folder) {

      //   // return folder.id === id;
      // });
    }

    this.passwordForm = new FormGroup({
      'serviceName': new FormControl(serviceName, Validators.required),
      'url': new FormControl(url, [Validators.required, this.validatorsService.url.bind(this.validatorsService)]),
      'userName': new FormControl(userName, Validators.required),
      'email': new FormControl(email, [Validators.required, this.validatorsService.email.bind(this.validatorsService)]),
      'pass': new FormControl(pass, Validators.required),
      'desc': new FormControl(desc),
      'folderSelect': new FormControl(folderSelect, Validators.required),
      'previewImage': new FormGroup({
        'image': new FormControl(img),
        'imageUrl': new FormControl(null, this.validatorsService.image.bind(this.validatorsService)),
        'uploadImage': new FormControl(null),
        'chooseImage': new FormControl(null)
      }),
      'additionalOptions': new FormGroup({})
    });

    this.folderForm = new FormGroup({
      'folderName': new FormControl(folderName, Validators.required),
      'folderSelect': new FormControl(folderSelect)
    });
  }

  updateImagesArray() {
    this.passwordsImageArray = [];
    this.getImagesLoader = this.loaderService.create({
      id: 'getImages'
    });

    let sub = this.getImagesLoader.present().subscribe(
      () => {
        this.getLogo.getSiteLogoArray(this.passwordForm.get('url').value, 6);
        sub.unsubscribe();
      }
    );
  }

  selectPreviewImage(image) {
    this.passwordForm.get('previewImage.imageUrl').setValue(image);
  }

  uploadImage(data) {
    console.log( data );
  }

  addMenuClicked(data) {
    const id = data.id;
    if ( id === 'item-modal' ) {
      this.isAddPasswordMode = true;
    }
    if ( id === 'folder-modal' ) {
      this.isAddFolderMode = true;
    }
    this.modalService.modalOpened.next(id);
  }
}
