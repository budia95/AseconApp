
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AvisosProvider {

  constructor(public api: ApiProvider) {
  }

  avisos() {
    return this.api.get2('listAvisos').then(data => {
      return data;
    });
  }

}
