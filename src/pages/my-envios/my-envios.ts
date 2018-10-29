import { CreateEnvioPage } from './../create-envio/create-envio';
import { EnviosProvider } from './../../providers/envios/envios';
import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import { Storage } from '@ionic/storage';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';  
import { File } from '@ionic-native/file'; 
import { InAppBrowser } from '@ionic-native/in-app-browser'

@Component({
  selector: 'my-envios',
  templateUrl: 'my-envios.html'
})
export class MyEnviosPage {

  envios: any;
  searchForm: any;
  showButton: boolean;
  private fileTransfer: FileTransferObject; 

  constructor(public storage : Storage, public navCtrl: NavController, public navParams: NavParams, private enviosProvider: EnviosProvider,  public toastCtrl: ToastController,
    private alertCtrl: AlertController, private transfer: FileTransfer, private file: File, private iab: InAppBrowser) {
      
      this.storage.get('usuario').then(data => {
        this.enviosProvider.myEnvios(data).then(data => {
          this.envios = data;
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

  descargar(envio){
    window.open("http://ardbud.pythonanywhere.com/media/"+envio["archivo"], '_system');
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
