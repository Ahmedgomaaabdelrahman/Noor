import { AyaPage } from './../aya/aya';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TextToSpeech} from '@ionic-native/text-to-speech';
import { Media, MediaObject } from '@ionic-native/media';
import { MainProvider } from './../../providers/main';

import { SuraPage } from '../sura/sura';


@Component({
  selector: 'page-allsura',
  templateUrl: 'allsura.html',
})
export class AllsuraPage {
  public verses : any [] = [] ;
  public Ayat : any [] = [] ;
  public suraid : any;
  public gozaaid : any;

  fontSize: number = 2;
   backcolor : string = 'white';
   fontColor : string = 'black';


  constructor(public MainProvider : MainProvider,private media: Media,private tts:TextToSpeech,public navCtrl: NavController, public navParams: NavParams) {
    this.gozaaid = this.navParams.get('gozaaid');
    this.suraid = this.navParams.get('suraid');


    if (this.gozaaid){
      this.MainProvider.getlessons(this.gozaaid,this.suraid).subscribe((res)=>{
        this.verses = res;
        console.log(this.verses);
    });
    }

    
  
  
  }
  getAyats(vers){
    this.navCtrl.push(AyaPage,{vers:vers});

  }


  listenName(suraname , id){
    const file: MediaObject = this.media.create(suraname);
    file.play();
    this.suraid = id;
  }

fireOne(vers){

    this.navCtrl.push(AyaPage,{vers:vers});
    console.log("id already exsit");
    console.log(vers);
 
}
    increaseFontSize() {
    this.fontSize = this.fontSize * 1.1;
} 

decreaseFontSize (){
  this.fontSize = this.fontSize / 1.1;
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
