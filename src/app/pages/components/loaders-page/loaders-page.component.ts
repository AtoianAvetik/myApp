import { Component } from '@angular/core';

import { LoaderService } from '../../../components/loader/loader.service';

@Component({
	selector: 'app-loaders-page',
	templateUrl: './loaders-page.component.html',
	styleUrls: ['./loaders-page.component.scss']
})

export class LoadersPageComponent {
	loader;

	constructor(private _loaderService: LoaderService) {}

	// Loaders

	loaderOpen(id: string, text: string) {
		if ( text ) {
			this.loader = this._loaderService.create({
				id: id,
				content: text
			});
		} else {
			this.loader = this._loaderService.create({
				id: id
			});
		}
		this.loader.present().subscribe(() =>{
			setTimeout(() => {
				this.loader.dismiss();
			},1000)
		});
	}
}
