import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';

@NgModule({
	imports: [MatButtonModule, MatMenuModule, MatIconModule],
	exports: [MatButtonModule, MatMenuModule, MatIconModule],
})
export class CustomMaterialModule { }
