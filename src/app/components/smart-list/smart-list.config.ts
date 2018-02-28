export const SMART_LIST_VIEW_TYPES = {
	list: 'list',
	tile: 'tile',
	table: 'table'
};
export const SMART_LIST_IMG_SIZES = {
	small: '-size-img-small',
	medium: '-size-img-medium',
	square: '-size-img-square',
	big: '-size-img-big'
};
export const SMART_LIST_CELL_SIZES = {
	small: '-size-cell-small',
	medium: '-size-cell-medium',
	big: '-size-cell-big',
};

export const DEFAULT_SMART_LIST_OPTIONS: SmartListOptionsInterface = {
	imgSize: SMART_LIST_IMG_SIZES.medium,
	cellSize: SMART_LIST_CELL_SIZES.medium
};
export interface SmartListOptionsInterface {
	imgSize?: string,
	cellSize?: string
}
