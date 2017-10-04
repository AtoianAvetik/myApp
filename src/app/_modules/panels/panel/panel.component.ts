import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

import { PanelService } from '../../../_services/panel.service';
import { AppService } from '../../../_services/app.service';

@Component({
  selector: 'app-panel',
  template: `    
    <div class="panel-wrap"
         [@panel]='isOpen ? this.openState : this.closeState'
         (@panel.start)="animationAction($event)"
         (@panel.done)="animationAction($event)">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('panel', [
      state('openLeftCollapsed', style({left: 0, transform: 'translateX(' + 65 + 'px)'})),
      state('openLeftExpanded', style({left: 0, transform: 'translateX(' + 220 + 'px)'})),
      state('closeLeftCollapsed', style({left: 0, transform: 'translateX(calc(-100% + ' + 65 + 'px))'})),
      state('closeLeftExpanded', style({left: 0, transform: 'translateX(calc(-100% + ' + 220 + 'px))'})),
      state('openRight', style({right: 0, transform: 'translateX(0px)'})),
      state('closeRight', style({right: 0, transform: 'translateX(100%)'})),
      transition('openRight => closeRight', animate('.2s')),
      transition('closeRight => openRight', animate('.2s')),
      transition('openLeftCollapsed => closeLeftCollapsed', animate('.2s')),
      transition('closeLeftCollapsed => openLeftCollapsed', animate('.2s')),
      transition('openLeftExpanded => closeLeftExpanded', animate('.2s')),
      transition('closeLeftExpanded => openLeftExpanded', animate('.2s')),
      transition('openLeftCollapsed => openLeftExpanded', animate('0.4s cubic-bezier(.55, 0, .1, 1)')),
      transition('openLeftExpanded => openLeftCollapsed', animate('0.4s cubic-bezier(.55, 0, .1, 1)')),
      transition('closeLeftCollapsed => closeLeftExpanded', animate('0.4s cubic-bezier(.55, 0, .1, 1)')),
      transition('closeLeftExpanded => closeLeftCollapsed', animate('0.4s cubic-bezier(.55, 0, .1, 1)'))
    ])
  ]
})
export class PanelComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() dir: string = 'left';
  private _isOpen = false;
  statuses = {
    left: {
      expanded: {
        open: 'openLeftExpanded',
        close: 'closeLeftExpanded'
      },
      collapsed: {
        open: 'openLeftCollapsed',
        close: 'closeLeftCollapsed'
      }
    },
    right: {
      open: 'openRight',
      close: 'closeRight'
    }
  };
  openSubscription: Subscription;
  closeSubscription: Subscription;
  private openState: string;
  private closeState: string;
  element;
  el: ElementRef;

  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
  }

  get isOpen() {
    return this._isOpen;
  }

  constructor(private panelService: PanelService,
              private appService: AppService,
              private elRef: ElementRef) {
    this.el = this.elRef;
    this.element = this.elRef.nativeElement;
  }

  ngOnInit() {
    //direction
    console.log(this.dir);
    switch (this.dir) {
      case 'left':
        this.openState = this.appService.isSidebarExpanded ? this.statuses.left.expanded.open : this.statuses.left.collapsed.open;
        this.closeState = this.appService.isSidebarExpanded ? this.statuses.left.expanded.close : this.statuses.left.collapsed.close;
        this.appService.toogleSidebarChange
          .subscribe(
            (status) => {
              this.openState = status ? this.statuses.left.expanded.open : this.statuses.left.collapsed.open;
              this.closeState = status ? this.statuses.left.expanded.close : this.statuses.left.collapsed.close;
            }
          );
        console.log(this.closeState);
        break;
      case 'right':
        this.openState =  this.statuses.right.open;
        this.closeState = this.statuses.right.close;
        console.log(this.closeState);
        break;
    }
        console.log(this.closeState);

    // ensure id attribute exists
    if (!this.id) {
      console.error('panel must have an id');
      return;
    }

    // add self (this panel instance) to the panel service so it's accessible from controllers
    this.panelService.add(this);

    // subscribe events
    this.openSubscription = this.panelService.panelWillOpened
      .subscribe(
        (id: string) => {
          if ( id === this.id ) {
            this.open();
            this.panelService.activePanel = this.id;
          }
        }
      );

    this.closeSubscription = this.panelService.panelWillClosed
      .subscribe(
        (id: string) => {
          if ( id === this.id ) {
            this.close();
            this.panelService.activePanel = null;
          }
        }
      );
  }

  // remove self from panel service when directive is destroyed
  ngOnDestroy(): void {
    this.panelService.remove(this.id);
    this.element.parentNode.removeChild(this.element);
    this.openSubscription.unsubscribe();
    this.closeSubscription.unsubscribe();
  }

  // open panel
  open(): void {
    this.isOpen = true;
  }

  // close panel
  close(): void {
    this.isOpen = false;
  }

  animationAction(event) {
    switch (event.phaseName) {
      case 'start':
        switch (event.toState) {
          case this.statuses.left.expanded.open: this.panelService.panelOpeningDidStart.next(); break;
          case this.statuses.left.collapsed.open: this.panelService.panelOpeningDidStart.next(); break;
          case this.statuses.right.open: this.panelService.panelOpeningDidStart.next(); break;
          case this.statuses.left.expanded.close:  this.panelService.panelClosingDidStart.next(); break;
          case this.statuses.left.collapsed.close:  this.panelService.panelClosingDidStart.next(); break;
          case this.statuses.right.close:  this.panelService.panelClosingDidStart.next(); break;
        }
        break;
      case 'done':
        switch (event.toState) {
          case this.statuses.left.expanded.open: this.panelService.panelOpeningDidDone.next(); break;
          case this.statuses.left.collapsed.open: this.panelService.panelOpeningDidDone.next(); break;
          case this.statuses.right.open: this.panelService.panelOpeningDidDone.next(); break;
          case this.statuses.left.expanded.close:  this.panelService.panelClosingDidDone.next(); break;
          case this.statuses.left.collapsed.close:  this.panelService.panelClosingDidDone.next(); break;
          case this.statuses.right.close:  this.panelService.panelClosingDidDone.next(); break;
        }
        break;
    }
  }
}
