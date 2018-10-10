import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  url: string = 'http://localhost/asecon_remota';

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    let Params = new HttpParams();
    // Support easy query params for GET requests

    if (params) {
      for (let k in params) {
        Params = Params.append(k, params[k]);
      }
    }

    return this.http.get(this.url + '/' + endpoint, {params: Params}).toPromise();
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts).toPromise();
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
      return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }
}
