
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

  //Devuelve todos los recibos que ha enviado el admin a un usuario
  myRecibos(usuario_id) {
    return this.api.post('myRecibos',JSON.stringify({acceso:'movil',usuario_id:usuario_id})).then(data => {
      return data;
    });;
  }

}
