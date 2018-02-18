import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PasswordsRoutingModule } from './passwords-routing.module';
import { AddMenuModule } from '../../components/add-menu/add-menu.module';
import { LoaderModule } from '../../components/loader/loader.module';
import { ModalModule } from '../../components/modals/modal.module';
import { AccordionModule } from '../../components/accordion/accordion.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { PasswordsComponent } from './passwords.component';
import { PasswordsGroupComponent } from './passwords-group/passwords-group.component';
import { CategoryComponent } from '../../forms/category/category.component';
import { PasswordComponent } from '../../forms/password/password.component';
import { SearchImageComponent } from '../../forms/search-image/search-image.component';
import { SmartListModule } from '../../components/smart-list/smart-list.module';

@NgModule({
	imports: [
		CommonModule,
		PasswordsRoutingModule,
		AddMenuModule,
		LoaderModule,
		ModalModule,
		PerfectScrollbarModule,
		AccordionModule,
		SmartListModule,
		NgbModule
	],
	declarations: [
		PasswordsComponent,
		PasswordsGroupComponent,
		CategoryComponent,
		PasswordComponent,
		SearchImageComponent
	],
	providers: [],
})
export class PasswordsModule { }
