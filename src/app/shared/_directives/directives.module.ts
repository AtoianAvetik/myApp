import { NgModule } from '@angular/core';

import { OpenModalDirective } from './modal-open.directive';
import { CloseModalDirective } from './modal-close.directive';
import { OpenPanelDirective } from './panel-open.directive';
import { ClosePanelDirective } from './panel-close.directive';
import { LoaderDirective } from './loader.directive';
import { MatchHeightDirective } from './match-height.directive';
import { ToggleFullscreenDirective } from './toggle-fullscreen.directive';

@NgModule({
  declarations: [
    OpenModalDirective,
    CloseModalDirective,
    OpenPanelDirective,
    ClosePanelDirective,
    LoaderDirective,
    ToggleFullscreenDirective
  ],
  exports: [
    OpenModalDirective,
    CloseModalDirective,
    OpenPanelDirective,
    ClosePanelDirective,
    LoaderDirective,
    ToggleFullscreenDirective
  ]
})
export class DirectivesModule {}
