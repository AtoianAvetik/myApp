import { NgModule } from '@angular/core';

import { OpenModalDirective } from './modal-open.directive';
import { CloseModalDirective } from './modal-close.directive';

@NgModule({
  declarations: [
    OpenModalDirective,
    CloseModalDirective
  ],
  exports: [
    OpenModalDirective,
    CloseModalDirective
  ]
})
export class DirectivesModule {}
