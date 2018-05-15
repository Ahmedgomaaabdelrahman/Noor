import { Component, ComponentFactoryResolver } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { MainProvider } from '../../providers/main';

@Component({
  selector: 'page-quesdetails',
  templateUrl: 'quesdetails.html',
})
export class QuesdetailsPage {
  question : any;
  quesAuio :any;
  Answers : any[] =[];

  constructor(public mainprovider:MainProvider,private nativeAudio: NativeAudio,public navCtrl: NavController, public navParams: NavParams) {
     this.question = this.navParams.get('qu');
     this.quesAuio = this.mainprovider.baseUrl+this.question.question_audio;
     let t = parseInt(this.question.type);
     console.log(t)
    
     for(let i= 0 ;i<t;i++){
       this.Answers.push(i+1);
     }
     console.log(this.Answers);


  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuesdetailsPage');
  }

  checkedTrue(answer){
    if(answer == this.question.correct){
      this.nativeAudio.preloadSimple('true','assets/true.mp3');
      this.nativeAudio.play('true');
    }
    else{
      this.nativeAudio.preloadSimple('false','assets/false.mp3');
      this.nativeAudio.play('false');
    }
  }
  back(){
    this.navCtrl.pop();
  }
}
