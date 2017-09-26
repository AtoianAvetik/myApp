import { NgModule } from '@angular/core';

import { OpenModalDirective } from './modal-open.directive';
import { CloseModalDirective } from './modal-close.directive';
import { LoaderDirective } from './loader.directive';

@NgModule({
  declarations: [
    OpenModalDirective,
    CloseModalDirective,
    LoaderDirective
  ],
  exports: [
    OpenModalDirective,
    CloseModalDirective,
    LoaderDirective
  ]
})
export class DirectivesModule {}
