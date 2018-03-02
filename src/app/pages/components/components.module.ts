import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { ComponentsRoutingModule } from "./components-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PanelModule } from '../../components/panels/panel.module';
import { LoaderModule } from '../../components/loader/loader.module';
import { NotificationModule } from '../../components/notifications/notification.module';
import { PrismModule } from '@ngx-prism/core';
import { ModalModule } from '../../components/modals/modal.module';
import { SmartListModule } from '../../components/smart-list/smart-list.module';
import { SmartFoldersModule } from '../../components/smart-folders/smart-folders.module';

import { PanelsPageComponent } from './panels-page/panels-page.component';
import { LoadersPageComponent } from './loaders-page/loaders-page.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { ModalsPageComponent } from './modals-page/modals-page.component';
import { AccordionModule } from '../../components/accordion/accordion.module';
import { AccordionPageComponent } from './accordion-page/accordion-page.component';
import { SmartListPageComponent } from './smart-list-page/smart-list-page.component';
import { SmartFoldersPageComponent } from './smart-folders-page/smart-folders-page.component';

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
	    SmartListModule,
	    SmartFoldersModule,
	    NgbModule,
	    FormsModule
    ],
    declarations: [
	    PanelsPageComponent,
	    LoadersPageComponent,
	    NotificationsPageComponent,
	    ModalsPageComponent,
	    AccordionPageComponent,
	    SmartListPageComponent,
	    SmartFoldersPageComponent
    ],
    providers: [],
})
export class ComponentsModule { }
