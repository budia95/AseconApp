import { DisplayUserPage } from './../display-user/display-user';
import { UserProvider } from './../../providers/user/user';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';

import {
  NavController, ToastController, ModalController, Events,
  MenuController,
  AlertController
} from 'ionic-angular';

import {HomePage} from "../home/home";
import { assert } from 'ionic-angular/umd/util/util';


@Component({
  selector: 'page-olvidar',
  templateUrl: 'olvidar.html'
})
export class OlvidarPage {

  loginForm: FormGroup;
  emailError: boolean = false;
  show: boolean = false;
  user : any;
  aux : any;
  constructor(public navCtrl: NavController,public alertCtrl : AlertController,
              private storage: Storage, private formBuilder: FormBuilder,
              private toastCtrl: ToastController, public events: Events, public auth: AuthServiceProvider, public userProvider: UserProvider,
              public menu: MenuController) {


    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
      session: new FormControl(false),
      type: new FormControl('')
    });

  }

  login() {
    let user = {
      email: this.loginForm.value.email,
    };

    this.userProvider.olvidar(user.email).then(data => {
     
      console.log(data.toString());
      let alert = this.alertCtrl.create({
        title: 'Contraseña restrablecida',
        message: 'Estimado cliente, le hemos proporcionado una nueva contraseña con la que podrá acceder a nuestra aplicación. Consultelo en su bandeja de correo.',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.setRoot(HomePage);
      
    }).catch(err => {
      console.log(err);
    });

  


      // TODO: save api_token and check if session must be saved
     
    
     /*.then(data => {

      // TODO: save api_token and check if session must be saved
      this.storage.set('auth', data).then(() => {

        // TODO: Login susccesfully -> Redirect to main page
        this.menu.enable(true, 'leftMenu');
        this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
      });

    }).catch(err => {
      console.log(err.error);
      this.toastCtrl.create({
        message: err.error,
        duration: 3000,
        position: 'bottom'
      }).present({});
    }); */

  }

  validateEmail() {
    if (this.loginForm.controls['email'].errors && this.loginForm.value.email) {
      this.emailError = true;
    } else {
      this.emailError = false;
    }
  }

}


