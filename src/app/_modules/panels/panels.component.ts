import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Panel } from '../../_models/panel.model';
import { PanelService } from '../../_services/panel.service';

@Component({
  selector: 'app-panels',
  template: `
    <div class="panel-container"></div>
    <div
      class="panel-overlay"
      [@overlay]='isOpen ? "open" : "close"'>
    </div>
  `,
  styleUrls: ['./panels.component.scss'],
  animations: [
    trigger('overlay', [
      state('open', style({opacity: 1})),
      state('close', style({opacity: 0, display: 'none'})),
      transition('close => open', animate('300ms')),
      transition('open => close', animate('300ms'))
    ])
  ]
})
export class PanelsComponent implements OnInit {
  private _isOpen = false;

  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
  }

  get isOpen() {
    return this._isOpen;
  }

  constructor(private panelService: PanelService,
              private elRef: ElementRef) { }

  ngOnInit() {
    this.panelService.isPanelsChanged
      .subscribe(
        (data: Array<Panel>) => {
          console.log( data );
          for (let panel of data) {
            this.elRef.nativeElement.querySelector('.panel-container').appendChild(panel.el.nativeElement);
          }
        }
      );
    this.panelService.panelOpeningDidStart
      .subscribe(
        () => {
          this.isOpen = true;
        }
      );
    this.panelService.panelClosingDidStart
      .subscribe(
        () => {
          this.isOpen = false;
        }
      );
  }

}
