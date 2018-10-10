import { EnviosProvider } from './../../providers/envios/envios';
import { MyEnviosPage } from './../my-envios/my-envios';
import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {Storage} from '@ionic/storage';

@Component({
  selector: 'create-envio',
  templateUrl: 'create-envio.html'
})
export class CreateEnvioPage {

  createEnvioForm: FormGroup;
  peticion : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private enviosProvider: EnviosProvider,
              private alertCtrl: AlertController, public storage : Storage) {
    this.createEnvioForm = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required, Validators.minLength(1),]),
      archivo : new FormControl('', [Validators.required,]),
    });

    this.peticion = this.navParams.data;
  }

  createEnvio(envio) {
    console.log(this.navParams);

      this.storage.get('usuario').then(data => {
        let envio = {
          titulo: this.createEnvioForm.value.titulo,
          fecha: this.getDate(),
          archivo: this.createEnvioForm.value.archivo,
          usuario_id : data,
          peticion_id : this.peticion['peticion_id']
        };

        this.enviosProvider.createEnvio(envio).then(data => {
          this.envioCreated();
          console.log(data);
          this.navCtrl.setRoot(MyEnviosPage);
        }).catch(error =>{

        })
      }).catch(error => {

      });
    
  }

  getDate(){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let dds;
    let mms;

    let yyyy = today.getFullYear();
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
    return yyyy+'-'+mms+'-'+dds;
  }

  envioCreated() {
    let alert = this.alertCtrl.create({
      message: 'Envio realizado correctamente',
    });
    alert.present();
  }

}