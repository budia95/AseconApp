
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PeticionesProvider {

  constructor(public api: ApiProvider) {
  }

  //Devuelve todas las peticiones relacionadas a un usuario
  myPeticiones(user_id) {
    return this.api.post('myPeticiones',JSON.stringify({acceso:'movil',user_id:user_id})).then(data => {
      return data;
    });;
  }

}
