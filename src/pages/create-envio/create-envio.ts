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

  //Seleccionar documento del gestor de archivos del teléfono para enviarlo
  openDoc(){
    this.archivo = "";
    //Comprobar que tipo de sistema operativo estamos utilizando
    if (this.plt.is('android')) {
      //Selector de archivo del gestor de documentos
        this.fileChooser.open()
        .then(uri => {
          //Resolver la dirección donde se encuentra el archivo
          this.filePath.resolveNativePath(uri)
          .then(file => {
            let filePath: string = file;
            //Recoger el tipo de extensión que tiene el archivo que hemos seleccionado
            this.arrayPath = file.split(".");
            this.tipoArchivo = this.arrayPath[1];
            if (filePath) {
              //Pasamos la dirección resuelta y la pasamos a base64 para el envío
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
      .catch(err => console.log('Error', err));
    }
  }

  //Envio de los datos al servidor
  createEnvio(envio) {
    console.log(this.navParams);

        this.storage.get('usuario').then(data => {

          //Recogida de los datos necesarios para el envío
          let envio = {
            titulo : this.createEnvioForm.value.titulo,
            usuario_id : data,
            peticion_id : this.peticion['pk'],
            archivo : this.archivo,
            extension : this.tipoArchivo,
            acceso:'movil'
          }

          //Envío al servidor
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

  //parseado de fecha
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

  //Aviso de que el archivo ha sido enviado con éxito.
  envioCreated() {
    let alert = this.alertCtrl.create({
      message: 'Envio realizado correctamente',
      buttons: ['OK']
    });
    alert.present();
  }

}