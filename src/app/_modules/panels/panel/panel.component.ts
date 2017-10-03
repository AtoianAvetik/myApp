import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import * as $ from 'jquery';

import { PanelService } from '../../../_services/panel.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-panel',
  template: `
    <div class="backdrop"
         [@backdrop]='isOpen ? "open" : "close"'
         (@backdrop.done)="animationDone($event)">
      <div class="panel-wrap"
           [@panel]='isOpen ? "open" : "close"'
           (@panel.done)="animationDone($event)">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('panel', [
      state('open', style({opacity: 1, transform: 'scale(1.0, 1.0)'})),
      state('close', style({opacity: 0, transform: 'scale(0, 0)'})),
      transition('close => open', animate('0.4s cubic-bezier(0.680, -0.550, 0.265, 1.550)')),
      transition('open => close', animate('0.4s cubic-bezier(0.680, -0.550, 0.19, 1.130)'))
    ]),
    trigger('backdrop', [
      state('open', style({opacity: 1})),
      state('close', style({opacity: 0, display: 'none'})),
      transition('close => open', animate('300ms')),
      transition('open => close', animate('600ms'))

    ])
  ]
})
export class PanelComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: $;
  private _isOpen = false;
  openSubscription: Subscription;
  closeSubscription: Subscription;

  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
  }

  get isOpen() {
    return this._isOpen;
  }

  constructor(private panelService: PanelService, private el: ElementRef) {
    this.element = $(el.nativeElement);
  }

  ngOnInit() {
    const panel = this;

    // ensure id attribute exists
    if (!this.id) {
      console.error('panel must have an id');
      return;
    }

    // close panel on background click
    this.element.on('click', (e: any) => {
      const target = $(e.target);
      if (!target.closest('.panel').length) {
        this.panelService.panelClosed.next(this.id);
      }
    });

    // add self (this panel instance) to the panel service so it's accessible from controllers
    this.panelService.add(this);

    // subscribe events
    this.openSubscription = this.panelService.panelOpened
      .subscribe(
        (id: string) => {
          if ( id === this.id ) {
            this.open();
          }
        }
      );

    this.closeSubscription = this.panelService.panelClosed
      .subscribe(
        (id: string) => {
          if ( id === this.id ) {
            this.close();
          }
        }
      );
  }

  // remove self from panel service when directive is destroyed
  ngOnDestroy(): void {
    this.panelService.remove(this.id);
    this.element.remove();
    this.openSubscription.unsubscribe();
    this.closeSubscription.unsubscribe();
  }

  // open panel
  open(): void {
    this.element.addClass('-active');
    this.element.find('.backdrop').addClass('-active');
    this.isOpen = true;
    console.log( this.element );
  }

  // close panel
  close(): void {
    this.element.removeClass('-active');
    this.element.find('.backdrop').removeClass('-active');
    this.isOpen = false;
  }

  animationDone(event) {
    if ( event.toState === 'close' ) {
      this.panelService.isPanelClosed.next();
    }
    if ( event.toState === 'open' ) {
      this.panelService.isPanelOpened.next();
    }
  }
}
