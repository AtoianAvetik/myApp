import { Subject } from 'rxjs/Subject';
import * as _ from 'underscore';

import { Loader } from '../_models/loader.model';

export class LoaderService {
  loaders: Array<Loader> = [];
  isloaderClosed = new Subject<boolean>();
  isloaderOpened = new Subject<boolean>();

  add(loader: Loader) {
    // add loader to array of active loaders
    this.loaders.push(loader);
  }

  remove(id: string) {
    // remove loader from array of active loaders
    const loaderToRemove = _.findWhere(this.loaders, { id: id });
    this.loaders = _.without(this.loaders, loaderToRemove);
  }

  create(data:{id: string, content?: string}) {
    let loader = _.findWhere(this.loaders, { id: data.id });
    if (!loader) {
      return null;
    } else {
      loader.content = data.content ? data.content: null;
    }
    return loader;
  }
}
