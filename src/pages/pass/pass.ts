import { HomePage } from './../home/home';
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

@Component({
  selector: 'page-pass',
  templateUrl: 'pass.html'
})
export class PassPage {

  passForm: FormGroup;
  passwordError: boolean = false;
  show: boolean = false;
  user : any;
  aux : any;
  constructor(public navCtrl: NavController,public alertCtrl : AlertController,
              private storage: Storage, private formBuilder: FormBuilder,
              private toastCtrl: ToastController, public events: Events, public auth: AuthServiceProvider, public userProvider: UserProvider,
              public menu: MenuController) {

    this.passForm = this.formBuilder.group({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      session: new FormControl(false),
      type: new FormControl('')
    },{validator: this.matchingPasswords('password', 'confirmPassword')});

  }
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  changePass() {

    this.storage.get('usuario').then(data => {

      let changePass = {
        usuario_id : data,
        password : this.passForm.value.password
      }

      this.userProvider.changePass(changePass).then(data => {
        console.log(data.toString());
        if(data.toString() === ''){
          this.toastCtrl.create({
            message: 'Contraseña no válida.',
            duration: 3000,
            position: 'bottom'
          }).present({});
        }
        else{
          let alert = this.alertCtrl.create({
            message: 'La contraseña se ha actualizado correctamente.'
          });
          alert.present();
          this.menu.enable(true, 'leftMenu');
          this.navCtrl.setRoot(HomePage);
        }
      });
    }).catch(err => {

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
    if (this.passForm.controls['password'].errors && this.passForm.value.password) {
      this.passwordError = true;
    } else {
      this.passwordError = false;
    }
  }

  togglePassword() {
    this.show = !this.show;
  }

}


