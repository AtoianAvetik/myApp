import {Component, HostBinding, Injectable, Input, OnInit} from '@angular/core';

import { ContentTableService } from '../../shared/_services/content-table.service';

@Component({
  selector: 'app-content-table',
  templateUrl: './content-table.component.html',
  styleUrls: ['./content-table.component.scss']
})
@Injectable()
export class ContentTableComponent {
  @Input() data;
  @Input() tableIndex;
  @HostBinding('attr.class') class = 'page-table';

  constructor(private contentTableService: ContentTableService) { }
}
