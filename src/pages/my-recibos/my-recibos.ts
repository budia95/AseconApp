import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, AlertController, Alert} from 'ionic-angular';
import {HomePage} from "../home/home";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {RecibosProvider} from '../../providers/recibos/recibos'
import { Storage } from '@ionic/storage';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';  
import { File } from '@ionic-native/file'; 
import { Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser'

@Component({
  selector: 'my-recibos',
  templateUrl: 'my-recibos.html'
})
export class MyRecibosPage {

  recibos: any;
  searchForm: any;
  fileTransfer: FileTransferObject;  
  storageDirectory : any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private recibosProvider: RecibosProvider,
              public toastCtrl: ToastController, private formBuilder: FormBuilder, public storage : Storage,
               private transfer: FileTransfer, private file: File, private plt : Platform, private alertCtrl : AlertController, 
               private iab : InAppBrowser) {
   /*  this.searchForm = this.formBuilder.group({
      name: new FormControl(''),
      tags: new FormControl(''),
      min_price: new FormControl(''),
      max_price: new FormControl('')
    }); */

    this.storage.get('usuario').then(data => {
      this.recibosProvider.myRecibos(data).then(data => {
        this.recibos = data;
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

  descargar(recibo){
    /* let url = encodeURIComponent("http://ardbud.pythonanywhere.com/media/"+recibo["pdf"]);
    this.iab.create('https://docs.google.com/viewer?url=' + url); */

    this.plt.ready().then(() => {
      let url = "http://ardbud.pythonanywhere.com/media/"+recibo["pdf"];
      let name;
    //here initializing object.  
    this.fileTransfer = this.transfer.create();  

    if(this.plt.is('android')){
      let fileName = recibo["pdf"].substr(9);
      this.storageDirectory = this.file.externalApplicationStorageDirectory;
      this.fileTransfer.download(url, this.storageDirectory + fileName).then((entry) => {  
        //here logging our success downloaded file path in mobile.  
        let alert = this.alertCtrl.create({
          title: 'Podrás encontrar tu descarga',
          message: 'Buscando en tu administrador de archivos en la carpeta: ' +entry.toURL() +" - "+ fileName,
        });
        alert.present();
        console.log('download completed: ' + entry.toURL());  
    }, (error) => {  
        //here logging our error its easier to find out what type of error occured.  
        let alert = this.alertCtrl.create({
          message: 'No se ha podido guardar el archivo'
        });
        alert.present();
        console.log('download failed: ' + error);  
    });  
    }
    else if(this.plt.is('ios')){
      this.storageDirectory = this.file.documentsDirectory;
      this.fileTransfer.download(url, this.storageDirectory + 'recibo.pdf').then((entry) => {  
        //here logging our success downloaded file path in mobile.  
        console.log('download completed: ' + entry.toURL());  
    }, (error) => {  
        //here logging our error its easier to find out what type of error occured.  

        console.log('download failed: ' + error);  
    });  
    }
    });
    
  }

    // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.  
    
  /* reloadRecibos() {
    console.log(this.searchForm.value);
    this.alumProvider.recibos(this.searchForm.value).then(data => {
      this.recibos = data;
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
