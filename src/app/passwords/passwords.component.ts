import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { AccordionService } from '../_services/accordion.service';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss'],
  providers: [AccordionService]
})
export class PasswordsComponent implements OnInit {
  isFoldersOpened = false;
  @ViewChild('folderNameInput') folderNameInputRef: ElementRef;
  @ViewChild('folderContentInput') folderContentInputRef: ElementRef;

  folders: Array<any> = [
    {
      heading: 'Accordion header 1',
      content: [
        {
         serviceName: 'Test Service 1',
         userName: 'testUser1',
         email: 'test1@test.test',
         password: '12345QcvD_s'
        },
        {
         serviceName: 'Test Service 2',
         userName: 'testUser2',
         email: 'test2@test.test',
         password: '12345QcvD_s'
        },
        {
         serviceName: 'Test Service 3',
         userName: 'testUser3',
         email: 'test3@test.test',
         password: '12345QcvD_s'
        }
      ]
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

  constructor(private accordionService:  AccordionService) { }

  ngOnInit() {
  }

  addFolder() {
    const folderName = this.folderNameInputRef.nativeElement.value;
    const folderContent = this.folderContentInputRef.nativeElement.value;
    const folder = {heading: folderName, content: folderContent};

    this.folders.push(folder);
  }

  toggleGroups() {
    this.accordionService.openAllChanged.emit(this.isFoldersOpened);
  }
}
