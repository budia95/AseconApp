import { LoginPage } from './../login/login';
import { ContactoPage } from './../contacto/contacto';
import { GeoPage } from './../geo/geo';
import { AreasPage } from './../areas/areas';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  logueado : boolean = false;

  ionViewWillEnter(){
    this.storage.get('usuario').then((val) => {
      if (val !== null) {
        this.logueado = true;
        console.log(this.logueado);
      } else {
        this.logueado = false;
        console.log(this.logueado);
      }
    });

  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private storage : Storage) {

  }

  areas(){
    this.navCtrl.push(AreasPage);
  }
  
  geo(){
    this.navCtrl.push(GeoPage);
  }

  contacto(){
    this.navCtrl.push(ContactoPage);
  }

  login(){
    this.navCtrl.push(LoginPage);
  }

}
