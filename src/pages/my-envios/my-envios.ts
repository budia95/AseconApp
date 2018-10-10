import { CreateEnvioPage } from './../create-envio/create-envio';
import { EnviosProvider } from './../../providers/envios/envios';
import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'my-envios',
  templateUrl: 'my-envios.html'
})
export class MyEnviosPage {

  envios: any[] = [];
  searchForm: any;
  showButton: boolean;

  constructor(public storage : Storage, public navCtrl: NavController, public navParams: NavParams, private enviosProvider: EnviosProvider,  public toastCtrl: ToastController,
    private alertCtrl: AlertController) {
      
      this.storage.get('usuario').then(data => {
        this.enviosProvider.myEnvios(data).then(data => {
          this.envios = data['envio'];
          console.log(data);
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

  createEnvio() {
  this.navCtrl.push(CreateEnvioPage);
  }

  /* reloadEnvios() {
    console.log(this.searchForm.value);
    this.alumProvider.envios(this.searchForm.value).then(data => {
      this.envios = data;
    }).catch(err => {
      console.log('Not authorized');
      this.navCtrl.setRoot(HomePage);
      this.toastCtrl.create({
        message: 'No autorizado, debes ser alumno para acceder',
        duration: 3000,
        position: 'bottom'
      }).present();
    });
  } */

}
