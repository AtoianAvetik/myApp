import { Component } from '@angular/core';
import { LoaderService } from '../../../components/loader/loader.service';

@Component({
    selector: 'app-dashboard1',
    templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.scss']
})

export class Dashboard1Component {
	loader;

	constructor(private _loaderService: LoaderService) {}

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
