import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'dashboard11',
				component: Dashboard1Component,
				data: {
					title: 'Dashboard 1'
				}
			},
			{
				path: 'dashboard12',
				component: Dashboard2Component,
				data: {
					title: 'Dashboard 2'
				}
			},
			{
				path: 'dashboard21',
				component: Dashboard1Component,
				data: {
					title: 'Dashboard 1'
				}
			},
			{
				path: 'dashboard3',
				component: Dashboard1Component,
				data: {
					title: 'Dashboard 3'
				}
			},
			{
				path: 'dashboard4',
				component: Dashboard2Component,
				data: {
					title: 'Dashboard 4'
				}
			}
		]
	}
];

@NgModule( {
	imports: [RouterModule.forChild( routes )],
	exports: [RouterModule],
} )
export class DashboardRoutingModule {
}
