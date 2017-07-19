import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss']
})
export class PasswordsComponent implements OnInit {
  isGroupOpen = false;

  groups: Array<any> = [
    {
      heading: 'Accordion header 1',
      content: ' I’m a dynamic content to show in angular 2 accordion : )'
    },
    {
      heading: 'Accordion header 2',
      content: 'I’m a dynamic content to show in angular 2 accordion : )'
    },
    {
      heading: 'Accordion header 3',
      content: 'I’m a dynamic content to show in angular 2 accordion : ) '
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
