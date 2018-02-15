import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { ComponentsRoutingModule } from "./components-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PanelModule } from '../../components/panels/panel.module';
import { LoaderModule } from '../../components/loader/loader.module';
import { NotificationModule } from '../../components/notifications/notification.module';
import { PrismModule } from '@ngx-prism/core';
import { ModalModule } from '../../components/modals/modal.module';

import { PanelsPageComponent } from './panels-page/panels-page.component';
import { LoadersPageComponent } from './loaders-page/loaders-page.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { ModalsPageComponent } from './modals-page/modals-page.component';
import { AccordionModule } from '../../components/accordion/accordion.module';
import { AccordionPageComponent } from './accordion-page/accordion-page.component';

@NgModule({
    imports: [
        CommonModule,
	    ComponentsRoutingModule,
	    PanelModule,
	    LoaderModule,
	    NotificationModule,
	    ModalModule,
	    PrismModule,
	    AccordionModule,
	    NgbModule
    ],
    declarations: [
	    PanelsPageComponent,
	    LoadersPageComponent,
	    NotificationsPageComponent,
	    ModalsPageComponent,
	    AccordionPageComponent
    ],
    providers: [],
})
export class ComponentsModule { }
