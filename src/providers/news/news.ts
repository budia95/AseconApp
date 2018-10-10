
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
    return this.api.get('listNews.php').then(data => {
      return data
    });
  }

  noticiasUsuarios() {
    return this.api.get('noticiasUsuarios.php').then(data => {
      return data
    });
  }

  myNews(user_id) {
    return this.api.get('myNews.php',{user_id:user_id}).then(data => {
      return data;
    });;
  }

  addNew(usuario_id, noticia_id) {
    return this.api.get('addNew.php', {noticia_id:noticia_id,usuario_id:usuario_id}).then(data => {
      return data;
    });;
  }

  removeNew(usuario_id, noticia_id) {
    return this.api.get('removeNew.php', {noticia_id:noticia_id,usuario_id:usuario_id}).then(data => {
      return data;
    });;
  }

  contieneNews(user_id) {
    return this.api.get('containsNews.php',{user_id:user_id}).then(data => {
      return data;
    });;
  }

}
