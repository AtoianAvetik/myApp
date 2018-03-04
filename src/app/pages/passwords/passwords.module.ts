import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectModule } from 'ng2-select';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PasswordsRoutingModule } from './passwords-routing.module';
import { AddMenuModule } from '../../components/add-menu/add-menu.module';
import { LoaderModule } from '../../components/loader/loader.module';
import { ModalModule } from '../../components/modals/modal.module';
import { AccordionModule } from '../../components/accordion/accordion.module';
import { SmartListModule } from '../../components/smart-list/smart-list.module';
import { SmartFoldersModule } from '../../components/smart-folders/smart-folders.module';

import { PasswordsComponent } from './passwords.component';
import { FolderComponent } from '../../forms/folder/folder.component';
import { PasswordComponent } from '../../forms/password/password.component';
import { SearchImageComponent } from '../../forms/search-image/search-image.component';

import { ValidatorsService } from '../../shared/_services/validators.service';
import { GetLogoService } from '../../shared/_services/get-logo.service';
import { ImgToBase64Service } from '../../shared/_services/img-to-base64.service';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgbModule,
		PasswordsRoutingModule,
		PerfectScrollbarModule,
		SelectModule,
		AddMenuModule,
		LoaderModule,
		ModalModule,
		AccordionModule,
		SmartListModule,
		SmartFoldersModule,
	],
	declarations: [
		PasswordsComponent,
		FolderComponent,
		PasswordComponent,
		SearchImageComponent
	],
	providers: [ValidatorsService, GetLogoService, ImgToBase64Service],
})
export class PasswordsModule { }
