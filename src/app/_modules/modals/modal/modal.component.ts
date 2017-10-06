import { Component, ElementRef, Input, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

import { ModalService } from '../../../_services/modal.service';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-modal',
  template: `
    <div class="modal-wrap"
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
  openSubscription: Subscription;
  closeSubscription: Subscription;
  element;
  el;

  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
  }

  get isOpen() {
    return this._isOpen;
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
    this.openSubscription = this.modalService.modalWillOpened
      .subscribe(
        (id: string) => {
          if ( id === this.id ) {
            this.open();
          }
        }
      );

    this.closeSubscription = this.modalService.modalWillClosed
      .subscribe(
        (id: string) => {
          if ( id === this.id ) {
            this.close();
          }
        }
      );
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.parentNode.removeChild(this.element);
    this.openSubscription.unsubscribe();
    this.closeSubscription.unsubscribe();
  }

  // open modal
  open(): void {
    document.body.classList.add('backstage');
    this.isOpen = true;
  }

  // close modal
  close(): void {
    document.body.classList.remove('backstage');
    this.isOpen = false;
  }

  animationAction(event) {
    switch(event.phaseName) {
      case 'start':
        switch (event.toState) {
          case 'open':  this.modalService.modalOpeningDidStart.next(); break;
          case 'close':  this.modalService.modalClosingDidStart.next(); break;
        }
        break;
      case 'done':
        switch (event.toState) {
          case 'open':  this.modalService.modalOpeningDidDone.next(); break;
          case 'close':  this.modalService.modalClosingDidDone.next(); break;
        }
        break;
    }
  }
}
