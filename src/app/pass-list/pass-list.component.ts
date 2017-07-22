import {Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { PassItemService } from '../_services/pass-item.service';
import { PassItem } from '../_models/pass-item.model';

@Component({
  selector: 'app-pass-list',
  templateUrl: './pass-list.component.html',
  styleUrls: ['./pass-list.component.scss'],
  providers: [PassItemService]
})
export class PassListComponent implements OnInit {
  passItems: PassItem[];
  selectedPassItemId: number;
  @ViewChild('serviceNameInput') serviceNameInputRef: ElementRef;
  @ViewChild('userNameInput') userNameInputRef: ElementRef;
  @ViewChild('emailInput') emailInputRef: ElementRef;
  @ViewChild('passInput') passInputRef: ElementRef;
  @ViewChild('newServiceNameInput') newServiceNameInputRef: ElementRef;
  @ViewChild('newUserNameInput') newUserNameInputRef: ElementRef;
  @ViewChild('newEmailInput') newEmailInputRef: ElementRef;
  @ViewChild('newPassInput') newPassInputRef: ElementRef;

  constructor(private passItemService: PassItemService) { }

  ngOnInit() {
    this.passItems = this.passItemService.getPassItems();
    this.passItemService.passItemsChanged
      .subscribe(
        (passItems: PassItem[]) => {
          this.passItems = passItems;
        }
      );
    this.passItemService.selectedPassItem
      .subscribe(
        (id: number) => {
          this.selectedPassItemId = id;
        }
      );
    this.passItemService.setEditedPassItem
      .subscribe(
        () => {
          this.setInputs(this.passItems[this.selectedPassItemId]);
        }
      );
  }

  onAddPassItem() {
    const itemServiceName = this.serviceNameInputRef.nativeElement.value;
    const itemUserName = this.userNameInputRef.nativeElement.value;
    const emailName = this.emailInputRef.nativeElement.value;
    const pass = this.passInputRef.nativeElement.value;
    const newPassItem = new PassItem(itemServiceName, itemUserName, emailName, pass);
    this.clearInputs();

    this.passItemService.addPassItem(newPassItem);
  }

  onEditPassItem() {
    const newItemServiceName = this.newServiceNameInputRef.nativeElement.value;
    const newItemUserName = this.newUserNameInputRef.nativeElement.value;
    const newEmailName = this.newEmailInputRef.nativeElement.value;
    const newPass = this.newPassInputRef.nativeElement.value;
    const newPassItem = new PassItem(newItemServiceName, newItemUserName, newEmailName, newPass);
    this.clearInputs();

    this.passItemService.updatePassItem(this.selectedPassItemId, newPassItem);
  }

  onDeletePassItem() {
    this.passItemService.deletePassItem(this.selectedPassItemId);
  }

  clearInputs() {
    this.serviceNameInputRef.nativeElement.value = '';
    this.userNameInputRef.nativeElement.value = '';
    this.emailInputRef.nativeElement.value = '';
    this.passInputRef.nativeElement.value = '';
    this.newServiceNameInputRef.nativeElement.value = '';
    this.newUserNameInputRef.nativeElement.value = '';
    this.newEmailInputRef.nativeElement.value = '';
    this.newPassInputRef.nativeElement.value = '';
  }

  setInputs(passItem: PassItem) {
    this.newServiceNameInputRef.nativeElement.value = passItem.serviceName;
    this.newUserNameInputRef.nativeElement.value = passItem.userName;
    this.newEmailInputRef.nativeElement.value = passItem.email;
    this.newPassInputRef.nativeElement.value = passItem.pass;
  }

}
