import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public api: ApiProvider) {
  }

  peticionCambio(user) {
    return this.api.post('cambio', user).then(data => {
      return data;
    });;
  }

  getUser(email,password) {
    return  this.api.get('getUser.php',{email:email,password:password}).then(data => {
      return data;
    });
  }

  displayUser(id) {
    return  this.api.get('displayUser.php',{id:id}).then(data => {
      return data;
    });
  }
 
}
