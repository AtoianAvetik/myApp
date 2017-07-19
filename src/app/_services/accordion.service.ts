import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class AccordionService {
  @Output() openAllChanged = new EventEmitter<boolean>();
}
