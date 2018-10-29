import { AreasPage } from'./../pages/areas/areas';
import { Tabs2Page } from './../pages/tabs2/tabs2';
import { TabsPage } from './../pages/tabs/tabs';
import { UserProvider } from './../providers/user/user';
import { RecibosProvider } from './../providers/recibos/recibos';
import { PeticionesProvider } from './../providers/peticiones/peticiones';
import { NewsProvider } from './../providers/news/news';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {GeoPage} from './../pages/geo/geo';
import {ContactoPage} from './../pages/contacto/contacto';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FileChooser } from '@ionic-native/file-chooser';
import { TokenInterceptor } from '../providers/api/TokenInterceptor';
import { IOSFilePicker } from '@ionic-native/file-picker';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';  
import { File } from '@ionic-native/file';
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { FilePath } from '@ionic-native/file-path'
import { Base64 } from '@ionic-native/base64'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import {AllAvisosPage} from "../pages/all-avisos/all-avisos";
import {AllNewsPage} from "../pages/all-news/all-news";
import {CreateEnvioPage} from "../pages/create-envio/create-envio";
import {CreateCambioPage} from "../pages/create-cambio/create-cambio";
import {MyEnviosPage} from "../pages/my-envios/my-envios";
import {MyPeticionesPage} from "../pages/my-peticiones/my-peticiones";
import {MyNewsPage} from "../pages/my-news/my-news";
import {MyRecibosPage} from "../pages/my-recibos/my-recibos";
import {DisplayUserPage} from "../pages/display-user/display-user";
import { PassPage } from "../pages/pass/pass";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';

import { ApiProvider } from '../providers/api/api';
import { AvisosProvider } from '../providers/avisos/avisos';
import { EnviosProvider } from '../providers/envios/envios';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CreateCambioPage,
    AllAvisosPage,
    AllNewsPage,
    CreateEnvioPage,
    MyEnviosPage,
    MyPeticionesPage,
    MyNewsPage,
    MyRecibosPage,
    DisplayUserPage,
    TabsPage,
    Tabs2Page,
    AreasPage,
    GeoPage,
    ContactoPage,
    PassPage
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CreateCambioPage,
    AllAvisosPage,
    AllNewsPage,
    CreateEnvioPage,
    MyEnviosPage,
    MyPeticionesPage,
    MyNewsPage,
    MyRecibosPage,
    DisplayUserPage,
    TabsPage,
    Tabs2Page,
    AreasPage,
    GeoPage,
    ContactoPage,
    PassPage
  ],

  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    AvisosProvider,
    EnviosProvider,
    AuthServiceProvider,
    NewsProvider,
    PeticionesProvider,
    RecibosProvider,
    UserProvider,
    FileChooser,
    IOSFilePicker,
    FileTransfer,  
    FileTransferObject,  
    File,
    FilePath,
    Base64,
    InAppBrowser,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthServiceProvider
  ]
})
export class AppModule {}
