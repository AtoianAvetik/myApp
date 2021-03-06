import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { MatchHeightModule } from '../../shared/_directives/match-height.directive';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgbModule,
	    MatchHeightModule
    ],
    declarations: [
        Dashboard1Component,
        Dashboard2Component,
    ],
    providers: [],
})
export class DashboardModule { }
