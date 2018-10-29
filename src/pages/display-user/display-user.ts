import { PassPage } from './../pass/pass';
import { NewsProvider } from './../../providers/news/news';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import {HomePage} from "../home/home";

@Component({
  selector: 'display-user',
  templateUrl: 'display-user.html',
})
export class DisplayUserPage {

  ionViewWillEnter(){
    this.storage.get('usuario').then(data => {
      this.userProvider.displayUser(data).then(data => {
        this.usuarios = data;
        console.log(this.usuarios);
      }).catch(err => {
        console.log('No autorizado');
        this.navCtrl.setRoot(HomePage);
        this.toastCtrl.create({
          message: 'Fallo al cargar.',
          duration: 3000,
          position: 'bottom'
        }).present();
      });
     }).catch(err => {
      console.log('No autorizado');
      this.navCtrl.setRoot(HomePage);
      this.toastCtrl.create({
        message: 'Fallo al cargar.',
        duration: 3000,
        position: 'bottom'
      }).present();
    });
  }
  usuarios: any;
  noticias: any;
  id : any;
  emailError: boolean = false;

  constructor(public navCtrl: NavController,public alertCtrl : AlertController,  public navParams: NavParams, private userProvider: UserProvider, private auth: AuthServiceProvider, public toastCtrl: ToastController, public storage: Storage, public newsProvider: NewsProvider) {

  }

  cambiarContrasena(){
    this.navCtrl.push(PassPage);
  }
}
