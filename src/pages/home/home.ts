import { AllayatPage } from './../allayat/allayat';
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility';
import { ToastController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Media, MediaObject } from '@ionic-native/media';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { GozaaPage } from '../gozaa/gozaa';
import { AyaPage } from '../aya/aya';
import { SuraPage } from '../sura/sura';
import { AllsuraPage } from '../allsura/allsura';
import { MainProvider } from '../../providers/main';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  matcheaya : any;
  matchesoura : any;
  syllbes : any;

  constructor(private platform: Platform,public MainProvider : MainProvider,private cd :ChangeDetectorRef,private speechReg:SpeechRecognition,private media: Media,private tts: TextToSpeech,public toastCtrl: ToastController,private mobileAccessibility: MobileAccessibility,public navCtrl: NavController) {
    this.MainProvider.getSyllabes().subscribe((res)=>{
      this.syllbes = res;
      console.log(this.syllbes);
    });


  

    if(this.mobileAccessibility.isScreenReaderRunning()){
      // this.presentToast("OKKay");
     
    }
    else {
    //  this.presentToast("Not Worked");
    }
  }
 
  getUnits(id){
    if(id == 5){
        this.navCtrl.push(AllayatPage);
    }
    else{
      this.MainProvider.getUnitsName(id).subscribe((res)=>{
        console.log(res);
        this.navCtrl.push(GozaaPage , {units : res}); 
      })
    }
    
 }

 
 back(){ 
  this.platform.exitApp(); 
  console.log('Pressed')
} 

  listenAya(){ 
    let options = {
      language : 'ar-EG'
    }

    this.speechReg.requestPermission().then((permission)=>{
      if(!permission){
        this.speechReg.requestPermission();
      } 
    });
   this.speechReg.startListening(options).subscribe(matches =>{
     this.matcheaya  = matches[0] ; 
     
     this.cd.detectChanges();
     this.navCtrl.push(AllayatPage , {matches : this.matcheaya , mmmm : matches});
   });
   
  }


  listenSura(){ 
    let options = {
      language : 'ar-EG'
    }
    this.speechReg.requestPermission().then((permission)=>{
      if(!permission){
        this.speechReg.requestPermission();
      } 
    });
     this.speechReg.startListening(options).subscribe(matches =>{
       console.log("Suora" , matches);
     this.matchesoura  = matches[0] ; 
     this.cd.detectChanges();
     this.navCtrl.push(SuraPage,{matches : this.matchesoura});
   });
   
  }


  searchGozaa(){ 
    this.navCtrl.push(GozaaPage);
   
  }

  allSura(){
    this.navCtrl.push(AllsuraPage);
  }


  getPermission(){
    this.speechReg.hasPermission().then((haspermission : boolean)=>{
      if(!haspermission){
        this.speechReg.requestPermission();
      }
    });
  }
  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }
}
