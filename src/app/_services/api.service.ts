import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  private url = '/assets/data';

  constructor(private http: Http) {}

  get(path) {
    return new Observable(observer => {
      this.http.get(`${this.url + path}`)
        .subscribe(res =>{
          observer.next(res.json());
        }, err =>{
          observer.error(err);
        })
    })
  }
}
