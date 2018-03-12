export const SMART_LIST_MODES = {
	internal: 'internal',
	external: 'external'
};
export const SMART_LIST_SELECT_MODES = {
	single: 'single',
	multi: 'multi'
};
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
	big: '-size-cell-big'
};
export const SMART_LIST_SWITCHER_TYPES = {
	view: {
		name: 'view',
		defValue: SMART_LIST_VIEW_TYPES.list
	},
	imgSize: {
		name: 'imgSize',
		defValue: SMART_LIST_IMG_SIZES.medium
	},
	cellSize: {
		name: 'cellSize',
		defValue: SMART_LIST_CELL_SIZES.medium
	}
};
export const DEFAULT_SMART_LIST_SETTINGS: SmartListSettingsInterface = {
	mode: SMART_LIST_MODES.internal,
	selectMode: SMART_LIST_SELECT_MODES.multi,
	viewType: SMART_LIST_SWITCHER_TYPES.view.defValue,
	imgSize: SMART_LIST_SWITCHER_TYPES.imgSize.defValue,
	cellSize: SMART_LIST_SWITCHER_TYPES.cellSize.defValue,
	actions: {
		add: false,
		edit: true,
		delete: true
	},
	multiSelect: {
		inputClass: '',
		actions: {
			transfer: true,
			delete: true
		},
	},
	filter: {
		inputClass: '',
	},
	edit: {
		class: 'btn btn-outline-primary btn-sm btn-raised',
		editButtonContent: '<i class="ft-settings"></i>',
	},
	delete: {
		class: 'btn btn-outline-danger btn-sm btn-raised',
		deleteButtonContent: '<i class="ft-trash-2"></i>',
	},
	attr: {
		id: '',
		class: '',
	},
	noDataMessage: 'No data found',
};
export interface SmartListSettingsInterface {
	mode?: string,
	selectMode?: string,
	viewType?: string,
	imgSize?: string,
	cellSize?: string,
	actions?: {
		add?: boolean,
		edit?: boolean,
		delete?: boolean
	},
	multiSelect?: {
		inputClass?: string,
		actions?: {
			transfer?: boolean,
			delete?: boolean
		},
	},
	filter?: {
		inputClass?: string,
	},
	edit?: {
		class?: string,
		editButtonContent?: string,
	},
	delete?: {
		class?: string,
		deleteButtonContent?: string,
	},
	attr?: {
		id?: string,
		class?: string,
	},
	noDataMessage?: string,
}
