import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader.component';
import { LoaderService } from './loader.service';
import { LoaderDirective } from './loader.directive';

@NgModule({
  exports: [
    LoaderComponent,
    LoaderDirective
  ],
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    LoaderDirective
  ],
  entryComponents: [LoaderComponent],
  providers: [LoaderService]
})
export class LoaderModule { }
