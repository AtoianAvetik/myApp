import {Component, ElementRef, Input, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import * as $ from 'jquery';

import { ModalService } from '../../_services/modal.service';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-modal',
  template: `
    <ng-content></ng-content>
    <div class="backdrop"></div>
  `,
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: $;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = $(el.nativeElement);
  }

  ngOnInit(): void {
    const modal = this;

    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    this.element.appendTo('body');

    // close modal on background click
    this.element.on('click', function (e: any) {
      const target = $(e.target);
      if (!target.closest('.modal').length) {
        modal.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);

    // subscribe events
    this.modalService.modalOpened
      .subscribe(
        (id: string) => {
          this.modalService.open(id);
        }
      );

    this.modalService.modalClosed
      .subscribe(
        (id: string) => {
          this.modalService.close(id);
        }
      );
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.addClass('-active');
    $('.backdrop').addClass('-active');
    $('body').addClass('backstage');
  }

  // close modal
  close(): void {
    this.element.removeClass('-active');
    $('.backdrop').removeClass('-active');
    $('body').removeClass('backstage');
  }
}
