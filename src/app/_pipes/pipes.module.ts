import { NgModule } from '@angular/core';

import {KeysPipe} from './keys.pipe';

@NgModule({
  declarations: [
    KeysPipe
  ],
  exports: [
    KeysPipe
  ]
})
export class PipesModule {}
