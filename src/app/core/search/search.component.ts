import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SidebarService } from '../../_services/sidebar.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  form: FormGroup;

  constructor(private sidebarService: SidebarService) { }

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
    this.sidebarService.toogleSidebarChange.next(true);
  }
}
