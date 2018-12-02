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

  //Envia los datos para corregir en la base de datos del admin (Aún no implementado)
  peticionCambio(user) {
    return this.api.post('cambio', user).then(data => {
      return data;
    });;
  }

  //Devuelve un usuario para poder verificar el login
  getUser(email,password) {
    return  this.api.post('getUser',JSON.stringify({email:email,password:password})).then(data => {
      return data;
    });
  }

  //Devuelve los datos de un usuario para mostrarlo en su perfil
  displayUser(id) {
    return  this.api.post('displayUser',JSON.stringify({acceso:'movil',usuario_id:id})).then(data => {
      return data;
    });
  }

  //Cambio de contraseña
  changePass(envio) {
    return  this.api.post('changePass',JSON.stringify(envio)).then(data => {
      return data;
    });
  }

  //Envía su email para que se le reestablezca la contraseña
  olvidar(email) {
    return  this.api.post('sendPass',JSON.stringify({email:email})).then(data => {
      return data;
    });
  }

}
