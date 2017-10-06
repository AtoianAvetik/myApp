import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Modal } from '../../_models/modal.model';
import { ModalService } from '../../_services/modal.service';

@Component({
  selector: 'app-modals',
  template: `
    <div class="modal-container"></div>
    <div
      class="modal-overlay"
      [@overlay]='isOpen ? "open" : "close"'>
    </div>
  `,
  styleUrls: ['./modals.component.scss'],
  animations: [
    trigger('overlay', [
      state('open', style({opacity: 1})),
      state('close', style({opacity: 0, display: 'none'})),
      transition('close => open', animate('0.3s')),
      transition('open => close', animate('0.3s'))
    ])
  ]
})
export class ModalsComponent implements OnInit {
  private _isOpen = false;

  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
  }

  get isOpen() {
    return this._isOpen;
  }

  constructor(private modalService: ModalService,
              private elRef: ElementRef) { }

  ngOnInit() {
    this.modalService.isModalsChanged
      .subscribe(
        (data: Array<Modal>) => {
          (data.length < 1) && (this.isOpen = false);
          for (const panel of data) {
            this.elRef.nativeElement.querySelector('.modal-container').appendChild(panel.el.nativeElement);
          }
        }
      );
    this.modalService.modalOpeningDidStart
      .subscribe(
        () => {
          document.body.classList.add('backstage');
          this.isOpen = true;
        }
      );
    this.modalService.modalClosingDidStart
      .subscribe(
        () => {
          if (!this.modalService.activeModals.length) {
            document.body.classList.remove('backstage');
            this.isOpen = false;
          }
        }
      );
  }

}
