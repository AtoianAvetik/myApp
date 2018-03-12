export class SmartListItemModel {
	constructor(public id: string,
	            public listId: string,
	            public data: any,
	            public isSelected: boolean = false) {}
}
