
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsProvider {

  constructor(public api: ApiProvider) {
  }

  //Devuelve la lista de todas las noticias
  news() {
    return this.api.post('listNews',JSON.stringify({acceso:'movil'})).then(data => {
      return data
    });
  }

  //Devuelve la relación que existe entre los usuarios y las noticias que le gustan
  noticiasUsuarios() {
    return this.api.post('noticiasUsuarios',JSON.stringify({acceso:'movil'})).then(data => {
      return data
    });
  }

  //Devuelve las noticias favoritas de un usuario
  myNews(user_id) {
    return this.api.post('myNews',JSON.stringify({acceso:'movil',usuario_id:user_id})).then(data => {
      return data;
    });;
  }

  //Añade una noticia a la lista de favoritas de un usuario
  addNew(usuario_id, noticia_id) {
    return this.api.post('addNew', JSON.stringify({acceso:'movil',noticia_id:noticia_id,usuario_id:usuario_id})).then(data => {
      return data;
    });;
  }

  //Elimina una noticia de la lista de favoritas de un usuario
  removeNew(usuario_id, noticia_id) {
    return this.api.post('removeNew', JSON.stringify({acceso:'movil',noticia_id:noticia_id,usuario_id:usuario_id})).then(data => {
      return data;
    });;
  }

  //Comprueba si el usuario tiene alguna noticia en favoritas
  contieneNews(user_id) {
    return this.api.post('containsNews',JSON.stringify({acceso:'movil',usuario_id:user_id})).then(data => {
      return data;
    });;
  }

}
