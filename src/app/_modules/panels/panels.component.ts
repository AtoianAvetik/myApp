import { Component, ElementRef, OnInit } from '@angular/core';

import { PanelService } from '../../_services/panel.service';
import { Panel } from '../../_models/panel.model';

@Component({
  selector: 'app-panels',
  templateUrl: './panels.component.html',
  styleUrls: ['./panels.component.scss']
})
export class PanelsComponent implements OnInit {
  constructor(private panelService: PanelService,
              private elRef: ElementRef) { }

  ngOnInit() {
    this.panelService.isPanelsChanged
      .subscribe(
        (data: Array<Panel>) => {
          for (let panel of data) {
            this.elRef.nativeElement.appendChild(panel['element'][0]);
          }
        }
      );
  }
}
