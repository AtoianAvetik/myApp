import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  @Input() isExpand = true;
  @Output() toogleSidebarChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  toggleSidebar() {
    this.isExpand = !this.isExpand;
    this.toogleSidebarChange.emit(this.isExpand);
  }
}
