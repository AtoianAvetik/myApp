import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
	{
		path: 'dashboard1',
		loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
	},
	{
		path: 'dashboard2',
		loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
	},
	{
		path: 'dashboard3',
		loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
	},
	{
		path: 'dashboard4',
		loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
	},
	{
		path: 'profile',
		loadChildren: './pages/user-profile/user-profile.module#UserProfileModule'
	},
	{
		path: 'components',
		loadChildren: './pages/components/components.module#ComponentsModule'
	},
	{
		path: 'passwords',
		loadChildren: './pages/passwords/passwords.module#PasswordsModule'
	}
];
