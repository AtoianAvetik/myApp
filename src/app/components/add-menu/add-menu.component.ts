import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent implements OnInit {
  @Input() menuItemsArray;
  @Output() triggeredItem = new Subject();
  open = false;

  constructor() { }

  ngOnInit() {
  }

  click(id) {
    this.triggeredItem.next({id: id});
  }
}
