import { CreateEnvioPage } from './../create-envio/create-envio';
import { PeticionesProvider } from './../../providers/peticiones/peticiones';
import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'my-peticiones',
  templateUrl: 'my-peticiones.html'
})
export class MyPeticionesPage {

  peticiones: any;
  searchForm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private peticionesProvider: PeticionesProvider,  public toastCtrl: ToastController,
    private alertCtrl: AlertController, public storage : Storage) {
     
    this.storage.get('usuario').then(data => {
      this.peticionesProvider.myPeticiones(data).then(data => {
        this.peticiones = data;
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

  createEnvio(peticion) {
  this.navCtrl.push(CreateEnvioPage, peticion);
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
