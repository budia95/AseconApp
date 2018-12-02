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

  //Ejecutar las acciones de dentro del método al acceder a la vista
  ionViewWillEnter(){

    //Cargar la lista de envíos
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

  constructor(public storage : Storage, public navCtrl: NavController, public navParams: NavParams, private enviosProvider: EnviosProvider,  public toastCtrl: ToastController,
    private alertCtrl: AlertController, private transfer: FileTransfer, private file: File, private iab: InAppBrowser) {
      
      
  }

  //Navegación a la página 
  createEnvio() {
  this.navCtrl.push(CreateEnvioPage);
  }

  //Botón para descargar el archivo que hemos enviado
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

  getDate(date){
    let fecha = new Date(date)
    let dd = fecha.getDate();
    let mm = fecha.getMonth()+1; //January is 0!
    let dds;
    let mms;

    let yyyy = fecha.getFullYear();
    if(dd<10){
        dds='0'+dd.toString();
    } 
    else{
      dds = dd.toString()
    }
    if(mm<10){
        mms='0'+mm.toString();
    } 
    else{
      mms = mm.toString()
    }
    return dds+'/'+mms+'/'+yyyy;

  }

}
