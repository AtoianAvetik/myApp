import { Component, ElementRef, Input, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

import { ModalService } from '../../../_services/modal.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-modal',
  template: `
    <div class="modal-wrap"
      [@modal]='isOpen ? "open" : "close"'
      (@modal.done)="animationDone($event)">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('modal', [
      state('open', style({opacity: 1, transform: 'scale(1.0, 1.0)'})),
      state('close', style({opacity: 0, transform: 'scale(0, 0)'})),
      transition('close => open', animate('0.4s cubic-bezier(0.680, -0.550, 0.265, 1.550)')),
      transition('open => close', animate('0.4s cubic-bezier(0.680, -0.550, 0.19, 1.130)'))
    ])
  ]
})

export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private _isOpen = false;
  openSubscription: Subscription;
  closeSubscription: Subscription;
  element;

  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
  }

  get isOpen() {
    return this._isOpen;
  }

  constructor(private modalService: ModalService,
              private el: ElementRef) {
    this.element = this.el.nativeElement;
  }

  ngOnInit(): void {
    const modal = this;

    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // close modal on background click
    this.element.addEventListener('click', (e: any) => {
      console.log( e );
      const target = e.target;
      if (!target.closest('.modal').length) {
        this.modalService.modalClosed.next(this.id);
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);

    // subscribe events
    this.openSubscription = this.modalService.modalOpened
      .subscribe(
        (id: string) => {
          if ( id === this.id ) {
            this.open();
          }
        }
      );

    this.closeSubscription = this.modalService.modalClosed
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

  animationDone(event) {
    if ( event.toState === 'close' ) {
      this.modalService.isModalClosed.next();
    }
    if ( event.toState === 'open' ) {
      this.modalService.isModalOpened.next();
    }
  }
}
