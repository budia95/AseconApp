import { MyNewsPage } from './../my-news/my-news';
import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import { NewsProvider } from '../../providers/news/news';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'all-news',
  templateUrl: 'all-news.html'
})
export class AllNewsPage {

  noticias: any;
  noticiasUsuarios: any;
  searchForm: any;
  noticiasFav : any;

  ionViewWillEnter(){
    this.storage.get('usuario').then(data => {
      this.newsProvider.contieneNews(data).then(data => {
        this.noticiasFav = data;
        console.log(data);
      }).catch(err => {
        console.log('No autorizado');
        this.navCtrl.setRoot(AllNewsPage);
        this.toastCtrl.create({
          message: 'Fallo al cargar.',
          duration: 3000,
          position: 'bottom'
        }).present();
      });
      }).catch(err => {
      console.log('No autorizado');
      this.navCtrl.setRoot(AllNewsPage);
      this.toastCtrl.create({
        message: 'Fallo al cargar.',
        duration: 3000,
        position: 'bottom'
      }).present();
    });

    this.newsProvider.news().then(data => {
      this.noticias = data;
    }).catch(err => {
      console.log(err.error);
      this.toastCtrl.create({
        message: err.error,
        duration: 3000,
        position: 'bottom'
      }).present({});
    });

    this.newsProvider.noticiasUsuarios().then(data => {
      this.noticiasUsuarios = data;
    }).catch(err => {
      console.log(err.error);
      this.toastCtrl.create({
        message: err.error,
        duration: 3000,
        position: 'bottom'
      }).present({});
    });
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public socialSharing : SocialSharing, public storage : Storage,
              public toastCtrl: ToastController, private formBuilder: FormBuilder, public newsProvider : NewsProvider, public alertCtrl : AlertController) {
                
                

  }

  shareNew(noticia) {
    let foto = "http://ardbud.pythonanywhere.com/media/"+noticia["foto"];
    this.socialSharing.share(noticia["titulo"], noticia["descripcion"],foto, noticia["url"]).then(() => {
      console.log("shareNew: Success");
    }).catch(() => {
      console.error("shareNew: failed");
    });
  }

  ampliarDescripcion(titulo, descripcion){
    let alert = this.alertCtrl.create({
      title: titulo,
      message: descripcion
    });
    alert.present();
  }

  containsNew(noticia_id){
    let res = false;
    var i;
    if(this.noticiasFav == null){
      return res;
    }
    else{
      for(i=0; this.noticiasFav.length>i;i++){
        if(this.noticiasFav[i]["fields"]['noticia_id'] == noticia_id){
          res = true;
          break;
        }
      }
      return res;
    }
    
    
  }

  /* countUsers(noticia_id){
    let res = 0;
    var i;
    if(this.noticiasUsuarios == null){
      return res;
    }
    else{
      for(i=0; this.noticiasUsuarios.length>i;i++){
        if(this.noticiasFav[i]['noticia_id'] == noticia_id){
          res++;
        }
      }
      return res;
    }
    
  } */

  addNew(noticia_id){
    this.storage.get('usuario').then(data => {
      this.newsProvider.addNew(data, noticia_id).then(data => {
        this.addCreated();
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
        console.log(data);
      }).catch(err => {
        console.log(err.error);
        this.toastCtrl.create({
          message: err.error,
          duration: 3000,
          position: 'bottom'
        }).present({});
      });
    }).catch(err => {
      console.log(err.error);
      this.toastCtrl.create({
        message: err.error,
        duration: 3000,
        position: 'bottom'
      }).present({});
    });
  }

  removeNew(noticia_id){
    this.storage.get('usuario').then(data => {
      this.newsProvider.removeNew(data, noticia_id).then(data => {
        this.removeAlert();
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
        console.log(data);
      }).catch(err => {
        console.log(err.error);
        this.toastCtrl.create({
          message: err.error,
          duration: 3000,
          position: 'bottom'
        }).present({});
      });
    }).catch(err => {
      console.log(err.error);
      this.toastCtrl.create({
        message: err.error,
        duration: 3000,
        position: 'bottom'
      }).present({});
    });
    
  }

  addCreated() {
    let alert = this.alertCtrl.create({
      message: 'Añadida a tus noticias favoritas.',
    });
    alert.present();
  }

  removeAlert() {
    let alert = this.alertCtrl.create({
      message: 'Eliminada de tus noticias favoritas.',
    });
    alert.present();
  }

  fotoVacia(foto){
    if(foto == null){
      return true;
    }
    else{
      return false;
    }
  }
}
