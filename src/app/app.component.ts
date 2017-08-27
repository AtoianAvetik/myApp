import { Component, OnInit } from '@angular/core';

import { AppService } from './_services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isSidebarExpanded = true;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.toogleSidebarChange
      .subscribe(
        (status: boolean) => {
          this.isSidebarExpanded = status;
        }
      );
  }

  onWrapClick() {
    this.appService.appWrapClicked.next();
  }
}
