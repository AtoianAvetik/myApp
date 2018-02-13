import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NotificationModule } from '../components/notifications/notification.module';

import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from './footer/footer.component';
import { NavigationItemComponent } from "./sidebar/navigation-item/navigation-item.component";
import { PanelsComponent } from "../components/panels/panels.component";
import { NotificationsComponent } from '../components/notifications/notifications.component';

@NgModule({
    exports: [
        CommonModule,
        NavbarComponent,
        FooterComponent,
        SidebarComponent,
	    PanelsComponent,
	    NotificationsComponent,
        NgbModule
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
	    NotificationModule,
	    PerfectScrollbarModule
    ],
    declarations: [
        NavbarComponent,
        FooterComponent,
        SidebarComponent,
	    PanelsComponent,
        NavigationItemComponent,
	    NotificationsComponent
    ]
})
export class SharedModule { }
