import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfilePageComponent } from './user-profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfilePageComponent
  },
  {
    path: ':id',
    component: UserProfilePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule { }
