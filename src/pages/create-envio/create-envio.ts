import { EnviosProvider } from './../../providers/envios/envios';
import { MyEnviosPage } from './../my-envios/my-envios';
import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {Storage} from '@ionic/storage';
import { FileChooser } from '@ionic-native/file-chooser';
import { IOSFilePicker } from '@ionic-native/file-picker';
import { Platform } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
import { Base64 } from '@ionic-native/base64';

@Component({
  selector: 'create-envio',
  templateUrl: 'create-envio.html'
})
export class CreateEnvioPage {

  createEnvioForm: FormGroup;
  peticion : any;
  archivo : any;
  tipoArchivo : any;
  arrayPath : any;
  hasArchivo : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private enviosProvider: EnviosProvider,
              private alertCtrl: AlertController, public storage : Storage, private fileChooser: FileChooser, private filePicker: IOSFilePicker, 
              public plt: Platform, private filePath : FilePath, private base64 : Base64) {
    this.createEnvioForm = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required, Validators.minLength(1),])
    });

    this.peticion = this.navParams.data;

  }

  openDoc(){
    if (this.plt.is('android')) {
        this.fileChooser.open()
        .then(uri => {
          this.filePath.resolveNativePath(uri)
          .then(file => {
            let filePath: string = file;
            this.arrayPath = file.split(".");
            this.tipoArchivo = this.arrayPath[1];
            if (filePath) {
              this.base64.encodeFile(filePath)
                      .then((base64File: string) => {
                        this.archivo = base64File;
                        this.hasArchivo = true;
              }).catch(err => {
                alert('err'+JSON.stringify(err));
              });
            }
      })
      .catch(err => {console.log(err)});
        })
        .catch(e =>{
          let alert = this.alertCtrl.create({
            message: e,
          });
          alert.present();
          console.log(e);
        });
  } 
    else if(this.plt.is('ios')){
      this.filePicker.pickFile()
      .then(uri => {
        let alert = this.alertCtrl.create({
          message: uri,
        });
        alert.present();
        console.log(uri)
      })
      .catch(err => console.log('Error', err));
    }
  }

  createEnvio(envio) {
    console.log(this.navParams);

        this.storage.get('usuario').then(data => {

          let envio = {
            titulo : this.createEnvioForm.value.titulo,
            usuario_id : data,
            peticion_id : this.peticion['pk'],
            archivo : this.archivo,
            extension : this.tipoArchivo
          }

          this.enviosProvider.createEnvio(envio).then(data => {
            this.envioCreated();
            console.log(data);
            this.navCtrl.setRoot(MyEnviosPage);
            }).catch(error =>{
              console.log(error);
            });
        }).catch(error => {
          console.log(error);
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