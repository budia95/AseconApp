import { MyNewsPage } from './../my-news/my-news';
import { AllNewsPage } from './../all-news/all-news';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1 = AllNewsPage;
  tab2 = MyNewsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {

  }
  

}
