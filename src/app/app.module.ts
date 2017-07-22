import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { SelectModule } from 'ng2-select';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { PasswordsComponent } from './passwords/passwords.component';
import { PassListComponent } from './pass-list/pass-list.component';
import { PassListItemComponent } from './pass-list/pass-list-item/pass-list-item.component';
import { ModalComponent } from './modal/modal.component';
import { AccordionComponent } from './accordion/accordion.component';
import { AccordionGroupComponent } from './accordion/accordion-group/accordion-group.component';
import { ContentTableComponent } from './content-table/content-table.component';
import { ContentTableRowComponent } from './content-table/content-table-row/content-table-row.component';

import { ModalService } from './_services/modal.service';
import { DataService } from './_services/data.service';
import { ContentTableService } from './_services/content-table.service';
import { SharedModule } from './shared/shared.module';
import { KeysPipe } from './_pipes/keys.pipe';

import { TestTableComponent } from './test-table/test-table.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pass-list', component: PassListComponent },
  { path: 'passwords', component: PasswordsComponent },
  { path: 'test-table', component: TestTableComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PassListComponent,
    PassListItemComponent,
    ModalComponent,
    SidebarComponent,
    HomeComponent,
    PasswordsComponent,
    AccordionComponent,
    AccordionGroupComponent,
    ContentTableComponent,
    ContentTableRowComponent,
    TestTableComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    SelectModule,
    RouterModule.forRoot(appRoutes),
    SharedModule
  ],
  providers: [ModalService, DataService, ContentTableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
