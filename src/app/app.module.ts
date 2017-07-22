import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { SelectModule } from 'ng2-select';

import { AppComponent } from './app.component';

/* Components */
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ModalComponent } from './components/modal/modal.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { AccordionGroupComponent } from './components/accordion/accordion-group/accordion-group.component';
import { ContentTableComponent } from './components/content-table/content-table.component';
import { ContentTableRowComponent } from './components/content-table/content-table-row/content-table-row.component';
import { ContentListComponent } from './components/content-list/content-list.component';
import { ContentListItemComponent } from './components/content-list/content-list-item/content-list-item.component';

/* Services */
import { ModalService } from './_services/modal.service';
import { DataService } from './_services/data.service';
import { ContentTableService } from './_services/content-table.service';
import { ContentListService } from './_services/content-list.service';

/* Pages */
import { HomeComponent } from './pages/home/home.component';
import { PassListComponent } from './pages/pass-list/pass-list.component';
import { PassListItemComponent } from './pages/pass-list/pass-list-item/pass-list-item.component';
import { PasswordsComponent } from './pages/passwords/passwords.component';
import { TestTableComponent } from './pages/test-table/test-table.component';

/* Modules */
import { DirectivesModule } from './_directives/directives.module';
import { PipesModule } from './_pipes/pipes.module';


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
    ContentListComponent,
    ContentListItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    SelectModule,
    RouterModule.forRoot(appRoutes),
    DirectivesModule,
    PipesModule
  ],
  providers: [ModalService, DataService, ContentTableService, ContentListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
