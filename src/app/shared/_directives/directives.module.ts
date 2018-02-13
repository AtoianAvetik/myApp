import { NgModule } from '@angular/core';

import { OpenModalDirective } from './modal-open.directive';
import { CloseModalDirective } from './modal-close.directive';
import { ToggleFullscreenDirective } from './toggle-fullscreen.directive';

@NgModule({
  declarations: [
    OpenModalDirective,
    CloseModalDirective,
    ToggleFullscreenDirective
  ],
  exports: [
    OpenModalDirective,
    CloseModalDirective,
    ToggleFullscreenDirective
  ]
})
export class DirectivesModule {}
