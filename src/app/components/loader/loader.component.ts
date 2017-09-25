import {Component, ElementRef, Input, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import * as $ from 'jquery';

import { LoaderService } from '../../_services/loader.service';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('loader', [
      state('open', style({opacity: 1})),
      state('close', style({opacity: 0})),
      transition('close => open', animate('0.4s linear')),
      transition('open => close', animate('0.4s linear'))
    ])
  ]
})

export class LoaderComponent implements OnInit, OnDestroy {
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

  constructor(private loaderService: LoaderService, private el: ElementRef) {
    this.element = $(el.nativeElement);
  }

  ngOnInit(): void {
    const loader = this;

    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // add self (this loader instance) to the loader service so it's accessible from controllers
    this.loaderService.add(this);

    // subscribe events
    this.openSubscription = this.loaderService.loaderOpened
      .subscribe(
        (id: string) => {
          if ( id === this.id ) {
            this.open();
          }
        }
      );

    this.closeSubscription = this.loaderService.loaderClosed
      .subscribe(
        (id: string) => {
          if ( id === this.id ) {
            this.close();
          }
        }
      );
  }

  // remove self from loader service when directive is destroyed
  ngOnDestroy(): void {
    this.loaderService.remove(this.id);
    this.element.remove();
    this.openSubscription.unsubscribe();
    this.closeSubscription.unsubscribe();
  }

  // open loader
  open(): void {
    this.element.children().addClass('-active');
    this.isOpen = true;
  }

  // close modal
  close(): void {
    this.element.children().removeClass('-active');
    this.isOpen = false;
  }

  animationDone(event) {
    if ( event.toState === 'close' ) {
      this.loaderService.isloaderClosed.next();
    }
  }
}
