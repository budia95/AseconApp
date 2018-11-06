
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

  news() {
    return this.api.post('listNews',JSON.stringify({acceso:'movil'})).then(data => {
      return data
    });
  }

  noticiasUsuarios() {
    return this.api.post('noticiasUsuarios',JSON.stringify({acceso:'movil'})).then(data => {
      return data
    });
  }

  myNews(user_id) {
    return this.api.post('myNews',JSON.stringify({acceso:'movil',usuario_id:user_id})).then(data => {
      return data;
    });;
  }

  addNew(usuario_id, noticia_id) {
    return this.api.post('addNew', JSON.stringify({acceso:'movil',noticia_id:noticia_id,usuario_id:usuario_id})).then(data => {
      return data;
    });;
  }

  removeNew(usuario_id, noticia_id) {
    return this.api.post('removeNew', JSON.stringify({acceso:'movil',noticia_id:noticia_id,usuario_id:usuario_id})).then(data => {
      return data;
    });;
  }

  contieneNews(user_id) {
    return this.api.post('containsNews',JSON.stringify({acceso:'movil',usuario_id:user_id})).then(data => {
      return data;
    });;
  }

}
