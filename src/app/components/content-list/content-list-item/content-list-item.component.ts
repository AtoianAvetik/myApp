import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-content-list-item',
  templateUrl: './content-list-item.component.html',
  styleUrls: ['./content-list-item.component.scss']
})
export class ContentListItemComponent implements OnInit {
  @Input() item;

  constructor() { }

  ngOnInit() {
  }

}
