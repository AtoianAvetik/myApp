import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppService {
  appWrapClicked = new Subject();
  toogleAccordionsChange = new Subject<boolean>();
}
