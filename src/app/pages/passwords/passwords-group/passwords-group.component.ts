import { Component, Input, OnInit } from '@angular/core';

import { ContentListService } from '../../../_services/content-list.service';

@Component({
  selector: 'app-passwords-group',
  templateUrl: './passwords-group.component.html',
  styleUrls: ['./passwords-group.component.scss']
})
export class PasswordsGroupComponent implements OnInit {
  @Input() foldersData;
  activeViewType = 'list';

  constructor(private contentListService: ContentListService) { }

  ngOnInit() {
    this.contentListService.viewTypeChanged
      .subscribe(
        (type: string) => {
          this.activeViewType = type;
        }
      );
  }

}
