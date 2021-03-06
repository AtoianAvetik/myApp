import {
  Component, Input, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectorRef
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { LoaderService } from './loader.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-loader-component',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('loading', [
      state('open', style({opacity: 1, visibility: 'visible'})),
      state('close', style({opacity: 0, visibility: 'hidden'})),
      transition('close => open', animate('0.3s linear')),
      transition('open => close', animate('0.2s linear'))
    ])
  ]
})

export class LoaderComponent implements OnInit, OnDestroy {
  @Input() id: string;
  content: string = null;
  private _isPresent = false;

  @Input()
  set isPresent(value: boolean) {
    this._isPresent = value;
  }

  get isPresent() {
    return this._isPresent;
  }

  constructor(private _loaderService: LoaderService, private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error('loader must have an id');
      return;
    }

    // add self (this loader instance) to the loader service so it's accessible from controllers
    this._loaderService.add(this);
  }

  // remove self from loader service when directive is destroyed
  ngOnDestroy(): void {
    this._loaderService.remove(this.id);
  }

  // open loader
  present(): Observable<boolean> | Promise<boolean> {
    this.isPresent = true;
    this._cdr.detectChanges();
    return this._loaderService.isloaderOpened;
  }

  // close loader
  dismiss(): Observable<boolean> | Promise<boolean> {
	this.isPresent = false;
	this._cdr.detectChanges();
	return this._loaderService.isloaderClosed;
  }

  animationDone(event) {
    if ( event.toState === 'close' ) {
      this._loaderService.isloaderClosed.next();
    }
    if ( event.toState === 'open' ) {
      this._loaderService.isloaderOpened.next();
    }
  }
}
