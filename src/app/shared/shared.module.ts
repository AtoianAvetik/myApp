import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NotificationModule } from '../components/notifications/notification.module';
import { PanelModule } from '../components/panels/panel.module';

import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from './footer/footer.component';
import { NavigationItemComponent } from "./sidebar/navigation-item/navigation-item.component";
import { ModalModule } from '../components/modals/modal.module';

@NgModule({
    exports: [
        CommonModule,
        NavbarComponent,
        FooterComponent,
        SidebarComponent,
        NgbModule,
	    NotificationModule,
	    PanelModule,
	    ModalModule
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
	    NotificationModule,
	    PerfectScrollbarModule,
	    PanelModule,
	    ModalModule
    ],
    declarations: [
        NavbarComponent,
        FooterComponent,
        SidebarComponent,
        NavigationItemComponent
    ]
})
export class SharedModule { }
