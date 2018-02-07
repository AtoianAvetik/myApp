import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from './footer/footer.component';
import { NavigationItemComponent } from './sidebar/navigation-item/navigation-item.component';


@NgModule({
    exports: [
        CommonModule,
        NavbarComponent,
        FooterComponent,
        SidebarComponent,
        NgbModule,
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
    ],
    declarations: [
        NavbarComponent,
        FooterComponent,
        SidebarComponent,
        NavigationItemComponent
    ]
})
export class SharedModule { }
