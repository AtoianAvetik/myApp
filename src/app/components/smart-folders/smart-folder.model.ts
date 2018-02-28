export class SmartFolderModel {
	constructor(public id: string,
	            public name: string,
	            public parentFolder: string = '',
	            public content: Array<any> = [],
	            public options: Object = {},
	            public childFolders: Array<any> = [],
	            public editable: boolean = true,
	            public deletable: boolean = true) {}
}
