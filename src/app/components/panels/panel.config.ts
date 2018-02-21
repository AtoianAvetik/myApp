import { InjectionToken } from '@angular/core';

export const DEFAULT_PANEL_CONFIG: PanelConfigInterface = {
	sidebarExpandedWidth: 0,
	sidebarCollapsedWidth: 0
};
export declare const PANEL_CONFIG: InjectionToken<{}>;
export interface PanelConfigInterface {
	sidebarExpandedWidth?: number;
	sidebarCollapsedWidth?: number;
}
