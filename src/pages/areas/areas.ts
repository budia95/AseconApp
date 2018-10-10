import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';

@Component({
  selector: 'page-areas',
  templateUrl: 'areas.html'
})
export class AreasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

  }

  fiscal(){
    let alert = this.alertCtrl.create({
      title: 'Asesoramiento fiscal',
      message: "<ul><li>Planificación y Gestión de impuestos</li><li>Declaración trimestral</li><li>Inspecciones y requerimientos</li><liImpuesto de Sociedades</li><li>IRPF</li><li>IVA</li><li>Impuestos Especiales</li><li>Fiscalidad Internacional</li></ul>"
    });
    alert.present();
  }

  contable(){
    let alert = this.alertCtrl.create({
      title: 'Asesoramiento contable',
      message: "<ul><li>Asesoramiento Contable</li><li>Configuración de Contabilidad</li><li>Análisis de Balances y datos contables</li><li>Contabilidad Analítica de coste</li></ul>"
    });
    alert.present();
  }

  financiero(){
    let alert = this.alertCtrl.create({
      title: 'Asesoramiento financiero',
      message: "<ul><li>Análisis de Estados Financieros</li><li>Planificación financiera</li><li>EOAF</li><li>Cuadros de tesorería</li><li>Valoración de Empresas</li><li>Informes Periciales</li><li>Planes de Negocio</li></ul>"
    });
   
    alert.present();
  }

  empresarial(){
    let alert = this.alertCtrl.create({
      title: 'Asesoramiento empresarial',
      message: "<ul><li>Administración de PYMES</li><li>Acompañamiento del Empresario</li><li>Organización de empresa</li><li>Análisis de puestos</li><li>Diseño de organigrama de trabajo</li><li>Implementación de método de administración</li></ul>"
    });
    alert.present();
  }

  civil(){
    let alert = this.alertCtrl.create({
      title: 'Asesoramiento jurídico civil',
      message: "<ul><li>Reclamaciones civiles</li><li>Contratos civiles</li><li>Reclamaciones de seguros</li><li>Arrendamientos</li><li>Reclamaciones de Impagos</li><li>Procedimiento judicial</li></ul>"
    });
    alert.present();
  }

  mercantil(){
    let alert = this.alertCtrl.create({
      title: 'Asesoramiento jurídico mercantil',
      message: "<ul><li>Constitución de Sociedades</li><li>Redacción de estatutos</li><li>Acuerdos personales</li><li>Contratos Mercantiles</li><li>Reclamaciones a entidades de créditos</li><li>Tramites en el registro mercantil</li></ul>"
    });
    
    alert.present();
  }

  sucesiones(){
    let alert = this.alertCtrl.create({
      title: 'Sucesiones',
      message: "<ul><li>Planificación y Gestión de impuestos</li><li>Testamentos</li><li>Administración de herencias yacentes</li><li>Tramites integrales de la Herencia</li></ul>"
    });
    alert.present();
  }

  patrimonios(){
    let alert = this.alertCtrl.create({
      title: 'Administración de patrimonios',
      message: "<ul><li>Asesoramiento en la gestión del patrimonio</li><li>Restructuraciones Patrimoniales</li><li>Protocolos familiares</li><li>Planificación de la tesorería</li><li>Asesoramiento para inversiones financieras</li></ul>"
    });
    alert.present();
  }
  

}
