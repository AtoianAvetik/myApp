import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { AccordionService } from '../_services/accordion.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss'],
  providers: [ModalService, AccordionService]
})
export class PasswordsComponent implements OnInit {
  isGroupsOpen = false;
  @ViewChild('folderNameInput') folderNameInputRef: ElementRef;
  @ViewChild('folderContentInput') folderContentInputRef: ElementRef;

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

  constructor(private modalService: ModalService, private accordionService:  AccordionService) { }

  ngOnInit() {
  }

  addFolder() {
    const folderName = this.folderNameInputRef.nativeElement.value;
    const folderContent = this.folderContentInputRef.nativeElement.value;
    const folder = {heading: folderName, content: folderContent};

    this.groups.push(folder);
  }

  toggleGroups() {
    this.accordionService.openAllChanged.emit(this.isGroupsOpen);
  }

  openModal(id: string) {
    this.modalService.modalOpened.emit(id);
  }

  closeModal(id: string) {
    this.modalService.modalClosed.emit(id);
  }
}
