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

  //Implementación del boton para compartir la noticia en todas las redes disponibles en el móvil
  shareNew(noticia) {
    let foto = "http://ardbud.pythonanywhere.com/media/"+noticia["foto"];
    this.socialSharing.share(noticia["titulo"], noticia["descripcion"],foto, noticia["url"]).then(() => {
      console.log("shareNew: Success");
    }).catch(() => {
      console.error("shareNew: failed");
    });
  }

 //Botón ver más de la noticia para poder ver el cuerpo entero de la noticia 
  ampliarDescripcion(titulo, descripcion){
    let alert = this.alertCtrl.create({
      title: titulo,
      message: descripcion
    });
    alert.present();
  }

  //Médoto para comprobar que la noticia que le entra está entre las noticicas favoritas del usuario actual
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

  //Implementación para añadir las noticia que le entra a las noticias favoritas del usuario actual
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

  //Implementación para eliminar de favoritas la noticia que le entra al método
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

  //Lanzamiento del aviso de que la noticia se ha añadido a las favoritas correctamente
  addCreated() {
    let alert = this.alertCtrl.create({
      message: 'Añadida a tus noticias favoritas.',
    });
    alert.present();
  }

  //Lanzamiento del aviso de que la noticia se ha eliminado de las favoritas correctamente
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

  //parseado de fecha
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
}
