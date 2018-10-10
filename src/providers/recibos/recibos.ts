
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecibosProvider {

  constructor(public api: ApiProvider) {
  }

  myRecibos(usuario_id) {
    return this.api.get('myRecibos.php',{usuario_id:usuario_id}).then(data => {
      return data;
    });;
  }

}
