import { AllquesPage } from './../allques/allques';
import { ShowtextPage } from './../showtext/showtext';
import { StatusBar } from '@ionic-native/status-bar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MainProvider } from './../../providers/main';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { NativeAudio } from '@ionic-native/native-audio';


@Component({
  selector: 'page-aya',
  templateUrl: 'aya.html',
})
export class AyaPage {
  Ayaid : any;
  suraid:any;
  aya:any;
  audiourl;
  fontSize: number = 2;
  public Main = MainProvider;
  tafsser;
  ayatext;
  _fileAvailable;
  _filetafsserAvailable;
  ayaflag = true;
  tafserflag = true;
  testsflag ;

  constructor(public toastCtrl: ToastController,private transfer: FileTransfer, private file: File,public mainprovider:MainProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.Ayaid = this.navParams.get('ayat_id');
    this.suraid = this.navParams.get('vers');
    


      this.mainprovider.getlesson(this.suraid).subscribe((res)=>{
        console.log(res);
        this.aya = res[0];
        
        console.log(this.aya);
        this.audiourl = this.mainprovider.baseUrl+this.aya.lesson_explained_audio;
        this.tafsser = this.mainprovider.baseUrl+this.aya.user_audio; 
        this.ayatext = this.aya.lesson_explained;
        if(this.aya.lesson_test_count==0){
          this.testsflag = false;
        }
        else {
          this.testsflag = true;
        }

        console.log("audioUrl",this.audiourl);
        this.checkFileAvailable();
        this.checkFileAvailableTafsser();
      });
    
  
    
   
    
  }
  // playayaaudio(){
  //   let file = new Audio();
  //   file.src = this.audiourl;
  //   if(this.ayaflag){
  //     this.nativeAudio.play('uniqueId1', () => console.log('uniqueId1 is done playing'));
  //     this.ayaflag = false;
  //   }
  //   else{
  //     this.nativeAudio.stop('uniqueId1').then();
  //     this.ayaflag = true;
  //   }
  //   console.log('Done');
    

  // }
  back(){
    this.navCtrl.pop();
  }  
  playtafser(){
    this.mainprovider.media().then((res)=>{
      console.log(res);
      
      this.mainprovider.toBase64(res[0].fullPath).then((audio)=>{
       
        var aud = audio.split('base64,');

        this.mainprovider.recordlesson(aud[1],this.suraid).subscribe(res => { 
        
          this.tafsser = this.mainprovider.baseUrl+res.user_audio;
          
     
        })
      })
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AyaPage');
    this.checkFileAvailable();
    this.checkFileAvailableTafsser();
  }
  
  downLoadFile(){
    const url = this.audiourl;
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(url, this.file.externalDataDirectory+"/"+this.aya.syllabus_name+"/"+this.aya.lesson_name+'.mp3').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      // this.presentToast('Download Done '+this.file.externalDataDirectory);
    }, (error) => {
      console.log(error);
      // this.presentToast('Error Done');
    });
  }

  downLoadTafsserFile(){
    const url = this.tafsser;
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(url, this.file.externalDataDirectory+"/"+this.aya.syllabus_name+"شروحات"+"/"+this.aya.lesson_name+'.mp3').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      // this.presentToast('Download Done '+this.file.externalDataDirectory);
    }, (error) => {
      console.log(error);
      // this.presentToast('Error Done');
    });
  }
  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

  checkFileAvailable() {
    this.file.resolveLocalFilesystemUrl(this.file.externalDataDirectory+"/"+this.aya.syllabus_name+"/"+this.aya.lesson_name+'.mp3')
      .then((fileEntry) => {
        this.audiourl = fileEntry.toURL();
        console.log(this.audiourl);
        // this.presentToast("file get from local storage");
        this._fileAvailable = true;
      })
      .catch(() => {
        this._fileAvailable = false;
      });
  
  }

  zoomText(){
    this.navCtrl.push(ShowtextPage , {ayatext : this.ayatext});
  }

  checkFileAvailableTafsser() {
    this.file.resolveLocalFilesystemUrl(this.file.externalDataDirectory+"/"+this.aya.syllabus_name+"شروحات"+"/"+this.aya.lesson_name+'.mp3')
      .then((fileEntry) => {
        this.tafsser = fileEntry.toURL();
        
        // this.presentToast("file get from local storage");
        this._filetafsserAvailable = true;
      })
      .catch(() => {
        this._filetafsserAvailable = false;
      });
  
  }
  increaseFontSize() {
    this.fontSize = this.fontSize * 1.1;
} 

decreaseFontSize (){
  this.fontSize = this.fontSize / 1.1;
}
exams(){
  console.log("ayaaaaaaaa",this.suraid)
  this.navCtrl.push(AllquesPage , {id : this.suraid});
}
}
