import { InjectionToken } from '@angular/core';

export const DEFAULT_PANEL_CONFIG: PanelConfigInterface = {
	leftPanelExpandedShift: 0,
	leftPanelCollapsedShift: 0,
	rightPanelExpandedShift: 0,
	rightPanelCollapsedShift: 0
};
export declare const PANEL_CONFIG: InjectionToken<{}>;
export interface PanelConfigInterface {
	leftPanelExpandedShift?: number,
	leftPanelCollapsedShift?: number,
	rightPanelExpandedShift?: number,
	rightPanelCollapsedShift?: number
}
