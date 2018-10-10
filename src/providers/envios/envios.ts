
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EnviosProvider {

  constructor(public api: ApiProvider) {
  }

  createEnvio(envio) {
    return this.api.get('createEnvio.php', envio).then(data => {
      return data;
    });;
  }

  myEnvios(user_id) {
    return this.api.get('myEnvios.php', {user_id:user_id}).then(data => {
      return data;
    });
  }

}
