import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from './footer/footer.component';
import { NavigationItemComponent } from './sidebar/navigation-item/navigation-item.component';
import { PanelsComponent } from './_modules/panels/panels.component';

@NgModule({
    exports: [
        CommonModule,
        NavbarComponent,
        FooterComponent,
        SidebarComponent,
	    PanelsComponent,
        NgbModule
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
	    PerfectScrollbarModule
    ],
    declarations: [
        NavbarComponent,
        FooterComponent,
        SidebarComponent,
	    PanelsComponent,
        NavigationItemComponent
    ]
})
export class SharedModule { }
