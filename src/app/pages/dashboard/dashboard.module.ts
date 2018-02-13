import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DirectivesModule } from '../../shared/_directives/directives.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { PanelComponent } from '../../shared/_modules/panels/panel/panel.component';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgbModule,
	    DirectivesModule
    ],
    declarations: [
        Dashboard1Component,
        Dashboard2Component,
	    PanelComponent
    ],
    providers: [],
})
export class DashboardModule { }
