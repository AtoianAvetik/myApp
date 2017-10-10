import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as _ from 'underscore';

import { Modal } from '../_models/modal.model';

@Injectable()
export class ModalService {
  private modals: any[] = [];тп
  activeModals: any[] = [];
  modalWillOpened = new Subject<string>();
  modalWillClosed = new Subject<string>();
  modalClosingDidStart = new Subject();
  modalClosingDidDone = new Subject();
  modalOpeningDidStart = new Subject();
  modalOpeningDidDone = new Subject();
  isModalsChanged = new Subject();
  forwardActiveChanged = new Subject<string>();

  add(modal: Modal) {
    // add modal to array of active modals
    this.modals.push(modal);
    this.isModalsChanged.next(this.modals.slice());
  }

  remove(id: string) {
    // remove modal from array of active modals
    const modalToRemove = _.findWhere(this.modals, { id: id });
    this.modals = _.without(this.modals, modalToRemove);
    this.isModalsChanged.next(this.modals.slice());
  }

  closeAll() {
    this.activeModals.forEach((id) => {
      this.modalWillClosed.next(id);
    });
  }

  addToActive(id: string) {
    this.activeModals.push(id);
    this.forwardActiveChanged.next(id);
  }

  removeFromActive(id: string) {
    const index: number = this.activeModals.indexOf(id);
    if (index !== -1) {
      this.activeModals.splice(index, 1);
      this.forwardActiveChanged.next(this.activeModals.length ? this.activeModals[this.activeModals.length - 1] : '');
    }
  }
}
