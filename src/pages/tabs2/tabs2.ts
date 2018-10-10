import { MyEnviosPage } from './../my-envios/my-envios';
import { MyPeticionesPage } from './../my-peticiones/my-peticiones';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-tabs2',
  templateUrl: 'tabs2.html'
})
export class Tabs2Page {

  tab1 = MyPeticionesPage;
  tab2 = MyEnviosPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {

  }
  

}
