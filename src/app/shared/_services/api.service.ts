import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  private url = '/assets/data';

  constructor(private http: HttpClient) {}

  get(path) {
    return new Observable(observer => {
      this.http.get(`${this.url + path}`)
        .subscribe(res =>{
          observer.next(res);
        }, err =>{
          observer.error(err);
        })
    })
  }
}
