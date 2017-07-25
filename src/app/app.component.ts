import { Component } from '@angular/core';
import {AppService} from "./_services/app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isSidebarExpanded = true;

  constructor(private appService: AppService) {

  }

  onToogleSidebar(status: boolean) {
    this.isSidebarExpanded = status;
  }

  onWrapClick() {
    this.appService.appWrapClicked.emit();
  }
}
