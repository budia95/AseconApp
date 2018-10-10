import { UserProvider } from './../user/user';
import { ApiProvider } from './../api/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
@Injectable()
export class AuthServiceProvider {
  currentUser: any;

  constructor(public api : ApiProvider, public userProvider: UserProvider) {
    
  }
 
  public login(user) {
    if (user['email'] === null || user['password'] === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (user['password'] === "password" && user['email'] === "email");
        this.currentUser = this.userProvider.getUser(user['email'],user['password']);
        observer.next(access);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}