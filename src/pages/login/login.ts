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
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;
  emailError: boolean = false;
  show: boolean = false;
  userArray : any[] = [];
  user_id: number;
  aux : any;
  constructor(public navCtrl: NavController,public alertCtrl : AlertController,
              private storage: Storage, private formBuilder: FormBuilder,
              private toastCtrl: ToastController, public events: Events, public auth: AuthServiceProvider, public userProvider: UserProvider,
              public menu: MenuController) {


    // TODO: Already logged -> Redirect to main page
    this.storage.get('usuario').then((val) => {
      if (val !== null) {
        this.menu.enable(true, 'leftMenu');
        this.navCtrl.setRoot(HomePage);
      }
    });

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      session: new FormControl(false),
      type: new FormControl('')
    });

  }

  login() {
    let user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.userProvider.getUser(user.email, user.password).then(data => {
      
      if(data['usuario'][0]["nombre"] === 'null'){
        this.toastCtrl.create({
          message: 'Usuario o contraseña incorrectos.',
          duration: 3000,
          position: 'bottom'
        }).present({});
      }
      else{
        this.storage.set('usuario', data['usuario'][0]["usuario_id"]).then(data => {
          this.events.publish('login:update', data);
          // TODO: Login susccesfully -> Redirect to main page
          this.menu.enable(true, 'leftMenu');
          this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
        }).catch(err => {
          console.log(err.error);
          this.toastCtrl.create({
            message: err.error,
            duration: 3000,
            position: 'bottom'
          }).present({});
        });
      }
     
     
      
    })

  


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

  togglePassword() {
    this.show = !this.show;
  }

}


