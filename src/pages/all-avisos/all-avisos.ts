import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import { AvisosProvider} from '../../providers/avisos/avisos'


@Component({
  selector: 'all-avisos',
  templateUrl: 'all-avisos.html'
})
export class AllAvisosPage {

  avisos: any;
  searchForm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public toastCtrl: ToastController, private formBuilder: FormBuilder, public avisosProvider: AvisosProvider) {
   /*  this.searchForm = this.formBuilder.group({
      name: new FormControl(''),
      tags: new FormControl(''),
      min_price: new FormControl(''),
      max_price: new FormControl('')
    });
 */
    this.avisosProvider.avisos().then(data => {
      this.avisos = data;
    }).catch(err => {
      console.log(err.error);
      this.toastCtrl.create({
        message: err.error,
        duration: 3000,
        position: 'bottom'
      }).present({});
    });
  }

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

  /* reloadAvisos() {
    console.log(this.searchForm.value);
    this.alumProvider.avisos(this.searchForm.value).then(data => {
      this.avisos = data;
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
