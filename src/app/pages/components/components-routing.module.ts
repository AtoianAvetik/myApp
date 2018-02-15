import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelsPageComponent } from './panels-page/panels-page.component';
import { LoadersPageComponent } from './loaders-page/loaders-page.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { ModalsPageComponent } from './modals-page/modals-page.component';

const routes: Routes = [
  {
	  path: '',
	  children: [
		  {
			  path: 'panels-page',
			  component: PanelsPageComponent,
			  data: {
				  title: 'Panels'
			  }
		  },
		  {
			  path: 'loaders-page',
			  component: LoadersPageComponent,
			  data: {
				  title: 'Loaders'
			  }
		  },
		  {
			  path: 'notifications-page',
			  component: NotificationsPageComponent,
			  data: {
				  title: 'Notifications'
			  }
		  },
		  {
			  path: 'modals-page',
			  component: ModalsPageComponent,
			  data: {
				  title: 'Modals'
			  }
		  }
	  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule { }