import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SmartFoldersService {
  folderSelected = new Subject<number>();
  editSelectedFolder = new Subject();
  deleteSelectedFolder = new Subject();

  constructor() { }
}
