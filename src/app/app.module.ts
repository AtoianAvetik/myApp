import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarListComponent } from './sidebar/sidebar-list/sidebar-list.component';
import { SidebarItemComponent } from './sidebar/sidebar-list/sidebar-item/sidebar-item.component';
import { HomeComponent } from './home/home.component';
import { PasswordsComponent } from './passwords/passwords.component';
import { PassListComponent } from './pass-list/pass-list.component';
import { PassListItemComponent } from './pass-list/pass-list-item/pass-list-item.component';
import { ModalComponent } from './modal/modal.component';
import { AccordionComponent } from './accordion/accordion.component';
import { AccordionGroupComponent } from './accordion/accordion-group/accordion-group.component';

import { DataService } from './_services/data.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pass-list', component: PassListComponent },
  { path: 'passwords', component: PasswordsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PassListComponent,
    PassListItemComponent,
    ModalComponent,
    SidebarComponent,
    SidebarListComponent,
    SidebarItemComponent,
    HomeComponent,
    PasswordsComponent,
    AccordionComponent,
    AccordionGroupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
