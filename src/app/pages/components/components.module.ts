import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { ComponentsRoutingModule } from "./components-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PanelModule } from '../../components/panels/panel.module';
import { LoaderModule } from '../../components/loader/loader.module';
import { NotificationModule } from '../../components/notifications/notification.module';
import { PrismModule } from '@ngx-prism/core';
import { PanelsPageComponent } from './panels-page/panels-page.component';
import { LoadersPageComponent } from './loaders-page/loaders-page.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { ModalsPageComponent } from './modals-page/modals-page.component';

@NgModule({
    imports: [
        CommonModule,
	    ComponentsRoutingModule,
	    PanelModule,
	    LoaderModule,
	    NotificationModule,
	    PrismModule,
	    NgbModule
    ],
    declarations: [
	    PanelsPageComponent,
	    LoadersPageComponent,
	    NotificationsPageComponent,
	    ModalsPageComponent
    ],
    providers: [],
})
export class ComponentsModule { }
