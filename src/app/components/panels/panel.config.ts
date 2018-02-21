import { InjectionToken } from '@angular/core';

export declare const PANEL_CONFIG: InjectionToken<{}>;
export interface PanelConfigInterface {
	sidebarExpandedWidth?: number;
	sidebarCollapsedWidth?: number;
}
