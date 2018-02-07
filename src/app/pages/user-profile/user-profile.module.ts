import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserProfilePageComponent } from './user-profile-page.component';


@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    NgbModule
  ],
  declarations: [
    UserProfilePageComponent,
  ],
  providers: [],
})
export class UserProfileModule { }
