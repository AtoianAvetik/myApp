import { NgModule } from '@angular/core';

import { OpenModalDirective } from './modal-open.directive';
import { CloseModalDirective } from './modal-close.directive';
import { OpenPanelDirective } from './panel-open.directive';
import { ClosePanelDirective } from './panel-close.directive';
import { LoaderDirective } from './loader.directive';

@NgModule({
  declarations: [
    OpenModalDirective,
    CloseModalDirective,
    OpenPanelDirective,
    ClosePanelDirective,
    LoaderDirective
  ],
  exports: [
    OpenModalDirective,
    CloseModalDirective,
    OpenPanelDirective,
    ClosePanelDirective,
    LoaderDirective
  ]
})
export class DirectivesModule {}
