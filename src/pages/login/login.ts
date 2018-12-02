import { OlvidarPage } from './../olvidar/olvidar';
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
  user : any;
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
     
      console.log(data.toString());
      //Si la respuesta de la llamada al proveedor devuelve un string vacío es que algo ha fallado
      if(data.toString() === ''){
        this.toastCtrl.create({
          message: 'Usuario o contraseña incorrectos.',
          duration: 3000,
          position: 'bottom'
        }).present({});
      }
      else{
        //Si accedemos guardamos el id del usuario en el localstorage
        this.storage.set('usuario', data[0]["pk"]).then(data => {
          this.events.publish('login:update', data);
          // Redirigimos a la página principal y activamos el menú desplegable
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

  }

  //Navegación a la página para recordar la contraseña
  olvidarPass(){
    this.navCtrl.push(OlvidarPage);
  }

  //Validación del correo electrónico
  validateEmail() {
    if (this.loginForm.controls['email'].errors && this.loginForm.value.email) {
      this.emailError = true;
    } else {
      this.emailError = false;
    }
  }

  //Mostrar la contraseña
  togglePassword() {
    this.show = !this.show;
  }

}


