import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'create-cambio',
  templateUrl: 'create-cambio.html'
})
export class CreateCambioPage {

  createCambioForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
              private alertCtrl: AlertController, private toastCtrl: ToastController) {
   /*  this.createCambioForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(6),]),
      date: new FormControl('', Validators.required),
    }); */
  }

  /* createCambio() {
    let cambio = {
      name: this.createCambioForm.value.name,
      description: this.createCambioForm.value.description,
      date: this.createCambioForm.value.date,
    };

    this.cambioProvider.createCambio(cambio).then(data => {
      this.navCtrl.setRoot(MyCambiosPage);
      this.cambioCreated();
    }).catch(err => {
      console.log(err);
      this.toastCtrl.create({
        message: err.error,
        duration: 3000,
        position: 'bottom'
      }).present({});
    });
  }

  cambioCreated() {
    let alert = this.alertCtrl.create({
      message: 'Experiencia creada correctamente',
    });
    alert.present();
  } */

}
