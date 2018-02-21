import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PANEL_CONFIG, PanelConfigInterface } from './components/panels/panel.config';

import { AppComponent } from './app.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';

/* Services */
import { DataService } from './shared/_services/data.service';
import { ApiService } from './shared/_services/api.service';

import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { SidebarService } from './shared/_services/sidebar.service';
import { LoaderService } from './components/loader/loader.service';
import { WindowRef } from './shared/_services/window-ref';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true
};

const CUSTOM_PANEL_CONFIG: PanelConfigInterface = {
	sidebarExpandedWidth: 250,
	sidebarCollapsedWidth: 60
};

@NgModule( {
	declarations: [
		AppComponent,
		FullLayoutComponent,
		ContentLayoutComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		SharedModule,
		HttpClientModule,
		AppRoutingModule,
		NgbModule.forRoot()
	],
	providers: [
		ApiService,
		DataService,
		AuthService,
		AuthGuard,
		SidebarService,
		LoaderService,
		WindowRef,
		{
			provide: PANEL_CONFIG,
			useValue: CUSTOM_PANEL_CONFIG
		},
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		}
	],
	bootstrap: [AppComponent]
} )
export class AppModule {
}
