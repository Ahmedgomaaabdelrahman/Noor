import { MainProvider } from './../../providers/main';
import { QuesdetailsPage } from './../quesdetails/quesdetails';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-allques',
  templateUrl: 'allques.html',
})
export class AllquesPage {
  ques : any[];
  constructor(public MainProvider:MainProvider,public navCtrl: NavController, public navParams: NavParams) {
   this.MainProvider.gettests(this.navParams.get('id')).subscribe((res)=>{
     console.log(this.navParams.get('id')); 
   
     this.ques = res;
     console.log(this.ques);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllquesPage');
  }
  back(){
    this.navCtrl.pop();
  }
  details(qu){
    console.log(qu);
    this.navCtrl.push(QuesdetailsPage , {qu : qu});
  }
}
