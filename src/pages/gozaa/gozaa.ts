import { AllsuraPage } from './../allsura/allsura';
import { MainProvider } from './../../providers/main';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-gozaa',
  templateUrl: 'gozaa.html',
})
export class GozaaPage {
  public units;

  constructor(public MainProvider:MainProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.units  = this.navParams.get('units');
  }
  back(){
    this.navCtrl.pop(); 
  } 
  ionViewDidLoad() {
    console.log('ionViewDidLoad GozaaPage');
  }
  
  gotoSura(id : number , suraid){
    this.navCtrl.push(AllsuraPage, {gozaaid : id , suraid : suraid});
  }
}
