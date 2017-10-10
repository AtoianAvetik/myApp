import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { ContentListService } from '../../_services/content-list.service';
import { DataService } from '../../_services/data.service';
import { ModalService } from '../../_services/modal.service';
import { AppService } from '../../_services/app.service';
import { PasswordCategory } from '../../_models/password-category.model';
import { AddMenuItem } from '../../_models/add-menu-item.model';
import { LoaderService } from '../../_services/loader.service';
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss']
})
export class PasswordsComponent implements OnInit, AfterViewInit {
  @ViewChild('folderForm') folderFormCmp;
  @ViewChild('passwordForm') passwordFormCmp;
  @ViewChild('searchImageForm') searchImageFormCmp;
  foldersData: {[name: string]: PasswordCategory};
  folders: Array<any>;
  foldersIdArray: Array<any>;
  passwordsLength: number = 0;
  isFoldersOpened = false;
  passwordMode = 'add';
  folderMode = 'add';
  deleteMode = '';
  activeViewType = 'list';
  listSelectedId: number;
  listItemSelectedIndex: number;
  addMenuItemsArray: Array<AddMenuItem>;
  selectedImage = null;
  folderFormLoader;
  passwordFormLoader;
  deleteFormLoader;

  constructor(private dataService: DataService,
              private contentListService: ContentListService,
              private appService: AppService,
              private modalService: ModalService,
              private loaderService: LoaderService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.initForms();
    this.updatePasswords(this.dataService.getPasswordsData());
    this.dataService.passwordsDataChanged
      .subscribe(
        (data: any) => {
          this.updatePasswords(data);
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
            this.folderFormLoader.dismiss();
          }
        }
      );
    this.addMenuItemsArray = [
      {id: 'item-modal', name: 'Add password', icon: 'add-site'},
      {id: 'folder-modal', name: 'Add folder', icon: 'folder-add'}
    ];
  }

  ngAfterViewInit() {
    this.crateLoaders();
  }

  crateLoaders() {
    this.folderFormLoader = this.loaderService.create({
      id: 'folderForm'
    });
    this.passwordFormLoader = this.loaderService.create({
      id: 'passwordForm'
    });
    this.deleteFormLoader = this.loaderService.create({
      id: 'deleteForm'
    });
  }

  updatePasswords(data: any) {
    this.foldersData = data.categories;
    this.folders = data.categoriesArray;
    this.foldersIdArray = data.categoriesIdArray;

    this.passwordsLength = 0;
    this.foldersIdArray.forEach((id) => this.passwordsLength = this.foldersData[id].content.length + this.passwordsLength);
  }

  initForms() {
    this.passwordFormCmp.initForm();
    this.folderFormCmp.initForm();
    this.searchImageFormCmp.initForm();
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

  selectImage() {
    this.passwordFormCmp.uploadImage(this.searchImageFormCmp.getSelectedImage())
  }

  deleteItem() {
    const sub = this.deleteFormLoader.present().subscribe(
      () => {
        const sub2 = this.dataService.passwordsDataChanged.subscribe(() => {
          const message = 'Password was deleted!';
          this.modalService.closeAll();
          this.notificationService.success(message);
          this.deleteFormLoader.dismiss();
          sub.unsubscribe();
          sub2.unsubscribe();
        });
        this.dataService.deletePassword(this.listSelectedId, this.listItemSelectedIndex);
      }
    );
  }

  deleteFolder() {
    const sub = this.deleteFormLoader.present().subscribe(
      () => {
        const sub2 = this.dataService.passwordsDataChanged.subscribe(() => {
          const message = 'Folder was deleted!';
          this.modalService.closeAll();
          this.notificationService.success(message);
          this.deleteFormLoader.dismiss();
          sub.unsubscribe();
          sub2.unsubscribe();
        });
        this.dataService.deletePasswordCategory(this.foldersData[this.listSelectedId]);
      }
    );
  }

  folderFormSubmit() {
    const sub = this.folderFormLoader.present().subscribe(
      () => {
        const sub2 = this.dataService.passwordsDataChanged.subscribe(() => {
          const message = this.folderMode === 'add' ? 'Folder was added!' : 'Folder was changed!';
          this.modalService.modalWillClosed.next('folder-modal');
          this.notificationService.success(message);
          this.folderFormLoader.dismiss();
          sub.unsubscribe();
          sub2.unsubscribe();
        });
        this.folderFormCmp.onSubmit();
      }
    );
  }

  passwordFormSubmit() {
    const sub = this.passwordFormLoader.present().subscribe(
      () => {
        const sub2 = this.dataService.passwordsDataChanged.subscribe(() => {
          const message = this.folderMode === 'add' ? 'Password was added!' : 'Password was changed!';
          this.modalService.modalWillClosed.next('item-modal');
          this.notificationService.success(message);
          this.passwordFormLoader.dismiss();
          sub.unsubscribe();
          sub2.unsubscribe();
        });
        this.passwordFormCmp.onSubmit();
      }
    );
  }

  addMenuClicked(data) {
    const id = data.id;
    this.passwordMode = 'add';
    this.folderMode = 'add';
    this.modalService.modalWillOpened.next(id);
  }
}
