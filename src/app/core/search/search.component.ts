import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AppService } from '../../_services/app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  form: FormGroup;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      'searchTerm': new FormControl(null)
    });
  }

  onSubmit() {
    console.log( this.form );
    this.form.reset();
  }

  openSidebar() {
    this.appService.toogleSidebarChange.next(true);
  }
}
