import { Component, ElementRef, Input, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

import { ModalService } from '../../../_services/modal.service';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-modal',
  template: `
    <div class="modal-wrap"
      [ngClass]="{'-is-forward': isForward}"
      [@modal]='isOpen ? "open" : "close"'
      (@modal.start)="animationAction($event)"
      (@modal.done)="animationAction($event)">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('modal', [
      state('open', style({opacity: 1, transform: 'scale(1.0, 1.0)'})),
      state('close', style({opacity: 0, transform: 'scale(0, 0)'})),
      transition('close => open', animate('0.3s cubic-bezier(0.680, -0.550, 0.265, 1.550)')),
      transition('open => close', animate('0.3s cubic-bezier(0.680, -0.550, 0.19, 1.130)'))
    ])
  ]
})

export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private _isOpen = false;
  private _isForward = false;
  willOpenSubscription: Subscription;
  willCloseSubscription: Subscription;
  isForwardSubscription: Subscription;
  element;
  el;

  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
  }
  get isOpen() {
    return this._isOpen;
  }

  @Input()
  set isForward(value: boolean) {
    this._isForward = value;
  }
  get isForward() {
    return this._isForward;
  }

  constructor(private modalService: ModalService,
              private elRef: ElementRef) {
    this.el = this.elRef;
    this.element = this.elRef.nativeElement;
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // close modal on background click
    this.element.addEventListener('click', (e: any) => {
      if (!e.target.closest('.modal')) {
        this.modalService.modalWillClosed.next(this.id);
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);

    // subscribe events
    this.willOpenSubscription = this.modalService.modalWillOpened
      .subscribe(
        (id: string) => {
          if ( id === this.id ) {
            this.open();
          }
        }
      );
    this.willCloseSubscription = this.modalService.modalWillClosed
      .subscribe(
        (id: string) => {
          if ( id === this.id ) {
            this.close();
          }
        }
      );
    this.isForwardSubscription = this.modalService.forwardActiveChanged
      .subscribe(
        (id: string) => {
          this.isForward = (id === this.id);
        }
      );
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.modalService.removeFromActive(this.id);
    this.element.parentNode.removeChild(this.element);
    this.willOpenSubscription.unsubscribe();
    this.willCloseSubscription.unsubscribe();
    this.isForwardSubscription.unsubscribe();
  }

  // open modal
  open(): void {
    this.modalService.addToActive(this.id);
    this.isOpen = true;
  }

  // close modal
  close(): void {
    this.modalService.removeFromActive(this.id);
    this.isOpen = false;
  }

  animationAction(event) {
    switch (event.phaseName) {
      case 'start':
        switch (event.toState) {
          case 'open':  this.modalService.modalOpeningDidStart.next(this.id); break;
          case 'close':  this.modalService.modalClosingDidStart.next(this.id); break;
        }
        break;
      case 'done':
        switch (event.toState) {
          case 'open':  this.modalService.modalOpeningDidDone.next(this.id); break;
          case 'close':  this.modalService.modalClosingDidDone.next(this.id); break;
        }
        break;
    }
  }
}
