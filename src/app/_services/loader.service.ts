import { Subject } from 'rxjs/Subject';
import * as _ from 'underscore';

import { Loader } from '../_models/loader.model';

export class LoaderService {
  loaders: Array<Loader> = [];
  loaderOpened = new Subject<string>();
  loaderClosed = new Subject<string>();
  isloaderClosed = new Subject();
  isloaderOpened = new Subject();

  add(loader: Loader) {
    // add loader to array of active loaders
    this.loaders.push(loader);
  }

  remove(id: string) {
    // remove loader from array of active loaders
    const loaderToRemove = _.findWhere(this.loaders, { id: id });
    this.loaders = _.without(this.loaders, loaderToRemove);
  }
}
