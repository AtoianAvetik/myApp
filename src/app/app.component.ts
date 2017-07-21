import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isSidebarExpanded = true;

  constructor() {

  }

  onToogleSidebar(status: boolean) {
    this.isSidebarExpanded = status;
  }

}
