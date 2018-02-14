import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { ComponentsRoutingModule } from "./components-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PanelModule } from '../../components/panels/panel.module';
import { LoaderModule } from '../../components/loader/loader.module';
import { NotificationModule } from '../../components/notifications/notification.module';

import { ComponentsComponent } from './components.component';

@NgModule({
    imports: [
        CommonModule,
	    ComponentsRoutingModule,
	    PanelModule,
	    LoaderModule,
	    NotificationModule,
        NgbModule
    ],
    declarations: [
	    ComponentsComponent,
    ],
    providers: [],
})
export class ComponentsModule { }
