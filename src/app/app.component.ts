import { TabsPage } from './../pages/tabs/tabs';
import { Tabs2Page } from './../pages/tabs2/tabs2';
import { LoginPage } from './../pages/login/login';
import { AuthServiceProvider } from './../providers/auth-service/auth-service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Storage} from "@ionic/storage";

import { HomePage } from '../pages/home/home';
import { AllAvisosPage } from '../pages/all-avisos/all-avisos';
import { MyRecibosPage } from '../pages/my-recibos/my-recibos';
import { DisplayUserPage } from '../pages/display-user/display-user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, tabIndex?: number, icon?: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public events: Events, public menuCtrl: MenuController, public storage: Storage, public auth : AuthServiceProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    const pagesAux = [
      {title: 'Inicio', component: HomePage, icon:'home'},
      {title: 'Noticias', component: TabsPage, icon: 'paper'},
      {title: 'Avisos', component: AllAvisosPage, icon: 'megaphone' },
      {title: 'Recibos', component: MyRecibosPage, icon: 'copy' },
      {title: 'Peticiones', component: Tabs2Page, icon: 'attach' },
      {title: 'Mi perfil', component: DisplayUserPage, icon: 'person'},
    ];

    this.storage.get('usuario').then((val) => {
      if (val !== null) {
        this.pages = pagesAux;
        console.log(this.pages);
      } else {
        this.menuCtrl.enable(false, 'leftMenu');
      }
    });

    events.subscribe('login:update', (val) => {
      console.log(val.rol);
        this.pages = pagesAux;
  
    });

  }

  

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.storage.clear().then(() => {
      this.menuCtrl.enable(false, 'leftMenu');
      this.nav.setRoot(HomePage);
    });
  }
}
