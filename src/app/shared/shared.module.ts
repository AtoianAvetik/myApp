import { NgModule } from '@angular/core';

import { openModalDirective } from './modal-open.directive';
import { closeModalDirective } from './modal-close.directive';

@NgModule({
  declarations: [
    openModalDirective,
    closeModalDirective
  ],
  exports: [
    openModalDirective,
    closeModalDirective
  ]
})
export class SharedModule{}
