import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainProvider } from '../../providers/main';


@Component({
  selector: 'page-showtext',
  templateUrl: 'showtext.html',
})
export class ShowtextPage {
public ayaText;
Ayaid : any;
suraid:any;
aya:any;
audiourl;
fontSize: number = 2;
backcolor : string = '#C27B2B';
fontColor : string = 'black';
public Main = MainProvider;
tafsser;
ayatext;
_fileAvailable;
_filetafsserAvailable;
ayaflag = true;
tafserflag = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ayaText = this.navParams.get('ayatext');
    console.log(this.ayaText)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowtextPage');
  }
  increaseFontSize() {
    this.fontSize = this.fontSize * 1.1;
    console.log(this.fontSize);
} 

decreaseFontSize (){
  this.fontSize = this.fontSize / 1.1;
  console.log(this.fontSize);
}

setbackcolor(val){
  this.backcolor = val;
  console.log(val);
}

setfontolor(val){
this.fontColor = val;
console.log(val);
}
back(){
  this.navCtrl.pop();
}
} 
