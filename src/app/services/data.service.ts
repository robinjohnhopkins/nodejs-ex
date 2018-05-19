import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

//import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getItems() {
    //return this.http.get('/api/items').map(res => res.json());
    return this.http.get('/api/items').pipe(map(res => res.json()));
  }

  addItem(item) {
    return this.http.post("/api/item", JSON.stringify(item), this.options);
  }

  editItem(item) {
    return this.http.put(`/api/item/${item._id}`, JSON.stringify(item), this.options);
  }

  deleteItem(item) {
    return this.http.delete(`/api/item/${item._id}`, this.options);
  }

  getValueSum() {
    //return this.http.get('/api/items/valuesum').map(res => res.json());
    return this.http.get('/api/items/valuesum').pipe(map(res => res.json()));
  }
  
}
