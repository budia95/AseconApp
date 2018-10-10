import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {RecibosProvider} from '../../providers/recibos/recibos'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'my-recibos',
  templateUrl: 'my-recibos.html'
})
export class MyRecibosPage {

  recibos: any[] = [];
  searchForm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private recibosProvider: RecibosProvider,
              public toastCtrl: ToastController, private formBuilder: FormBuilder, public storage : Storage) {
   /*  this.searchForm = this.formBuilder.group({
      name: new FormControl(''),
      tags: new FormControl(''),
      min_price: new FormControl(''),
      max_price: new FormControl('')
    }); */

    this.storage.get('usuario').then(data => {
      this.recibosProvider.myRecibos(data).then(data => {
        this.recibos = data['recibo'];
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
