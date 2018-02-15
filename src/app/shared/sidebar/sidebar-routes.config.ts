import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [
	{
		path: '', title: 'Components', icon: 'ft-box', class: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
			{ path: '/components/panels-page', title: 'Panels', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
			{ path: '/components/loaders-page', title: 'Loaders', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
			{ path: '/components/notifications-page', title: 'Notifications', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
			{ path: '/components/modals-page', title: 'Modals', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
			{ path: '/components/accordion-page', title: 'Accordion', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
		]
	},
	{   path: '/passwords', title: 'Passwords', icon: 'ft-lock', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    {
        path: '', title: 'Dashboard 1', icon: 'ft-home', class: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
            { path: '/dashboard1/dashboard11', title: 'Dashboard 11', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
	        { path: '/dashboard1/dashboard12', title: 'Dashboard 12', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
    },
    {
        path: '', title: 'Dashboard 2', icon: 'ft-home', class: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
            { path: '/dashboard2/dashboard21', title: 'Dashboard 21', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
    },
    {   path: '/dashboard3/dashboard3', title: 'Dashboard 3', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    {
	    path: '', title: 'User 1', icon: 'ft-user', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: '/profile', title: 'Profile', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
	        { path: '', title: 'Dashboard 4', icon: 'ft-home', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
		        { path: '/dashboard4/dashboard4', title: 'Dashboard 4', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
	        ]}
        ]
    }
];
