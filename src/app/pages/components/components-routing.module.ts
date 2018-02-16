import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelsPageComponent } from './panels-page/panels-page.component';
import { LoadersPageComponent } from './loaders-page/loaders-page.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { ModalsPageComponent } from './modals-page/modals-page.component';
import { AccordionPageComponent } from './accordion-page/accordion-page.component';
import { SmartListPageComponent } from './smart-list-page/smart-list-page.component';
import { SmartFoldersPageComponent } from './smart-folders-page/smart-folders-page.component';

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
		  },
		  {
			  path: 'accordion-page',
			  component: AccordionPageComponent,
			  data: {
				  title: 'Accordion'
			  }
		  },
		  {
			  path: 'smart-list-page',
			  component: SmartListPageComponent,
			  data: {
				  title: 'Smart list'
			  }
		  },
		  {
			  path: 'smart-folders-page',
			  component: SmartFoldersPageComponent,
			  data: {
				  title: 'Smart folders'
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
