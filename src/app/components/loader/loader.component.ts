import {
  Component, Input, OnInit, OnDestroy, ViewEncapsulation
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { LoaderService } from '../../_services/loader.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('loader', [
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

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error('loader must have an id');
      return;
    }

    // add self (this loader instance) to the loader service so it's accessible from controllers
    this.loaderService.add(this);
  }

  // remove self from loader service when directive is destroyed
  ngOnDestroy(): void {
    this.loaderService.remove(this.id);
  }

  // open loader
  present(): Observable<boolean> | Promise<boolean> {
    this.isPresent = true;
    return this.loaderService.isloaderOpened;
  }

  // close loader
  dismiss(): void {
    this.isPresent = false;
  }

  animationDone(event) {
    if ( event.toState === 'close' ) {
      this.loaderService.isloaderClosed.next();
    }
    if ( event.toState === 'open' ) {
      this.loaderService.isloaderOpened.next();
    }
  }
}
