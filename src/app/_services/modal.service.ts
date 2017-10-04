import { Subject } from 'rxjs/Subject';
import * as _ from 'underscore';

import { Modal } from '../_models/modal.model';

export class ModalService {
  private modals: any[] = [];
  modalWillOpened = new Subject<string>();
  modalWillClosed = new Subject<string>();
  modalClosingDidStart = new Subject();
  modalClosingDidDone = new Subject();
  modalOpeningDidStart = new Subject();
  modalOpeningDidDone = new Subject();
  isModalsChanged = new Subject();

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
}
