import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
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
