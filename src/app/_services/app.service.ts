import { Subject } from 'rxjs/Subject';

export class AppService {
  appWrapClicked = new Subject();
  toogleSidebarChange = new Subject<boolean>();
}
