import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Base64 } from '@ionic-native/base64';
import 'rxjs/add/operator/map';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
/*
  Generated class for the MainProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MainProvider {
   
  
  public baseUrl : string = "https://noortamkeen.online/";
  public verseUrl : string = this.baseUrl+"verses";
  public syllabesUrl : string = this.baseUrl+"getsyllabus";
  
  public getUnitsNameUrl : string = this.baseUrl+"getUnitsName/";
  public getlessonsUrl : string = this.baseUrl+"getlessons/";
  public getlessonUrl : string = this.baseUrl+"getlesson/";
  public recoredLessonUrl : string = this.baseUrl+"reocredexplain/";
  
  public AyatUrl : string = this.baseUrl+"ayat/";
  public getAyaUrl  : string = this.baseUrl+"getayainfoapi/"
  public versnameAudio : string = this.baseUrl+"verses_name_audio/" ;
  public ayaAudio : string = this.baseUrl+"ayat/";
  public tafsserAudio : string = this.baseUrl+"tafsser/";
  public gozaaUrl : string = this.baseUrl+"getsourbygoza/";
  public serachbyaya : string = this.baseUrl+"serachbyayaapi";
  public serachbysoura: string = this.baseUrl+"serachbysearchapi";
  public gettestsUrl: string = this.baseUrl+"gettests/";
  

  constructor(private mediaCapture: MediaCapture,private base64: Base64,public http: Http) {
    console.log('Hello MainProvider Provider');
  }
  gettests(id):Observable<any>{
    return this.http.get(this.gettestsUrl+id).map((res) => res.json());
  }

  getSyllabes():Observable<any>{
    return this.http.get(this.syllabesUrl).map((res) => res.json());
  }
 
 getUnitsName(id):Observable<any>{
    return this.http.get(this.getUnitsNameUrl+id).map((res) => res.json());
  }
  getlessons(uintid , syllid):Observable<any>{
    return this.http.get(this.getlessonsUrl+uintid+"/"+syllid).map((res) => res.json());
  } 
  getlesson(lessonid):Observable<any>{
    return this.http.get(this.getlessonUrl+lessonid).map((res) => res.json());
  }
  recordlesson(filebase,id):Observable<any>{
    let body = {
      user_audio : filebase
    }
    return this.http.put(this.recoredLessonUrl+id,body).map((res) => res.json());
  }
  media():Promise<any>{
    let promise =new Promise((resolve,reject)=>{
      // let options: CaptureVideoOptions = { duration: 60 };
      this.mediaCapture.captureAudio()
        .then(
          (data: MediaFile[]) => resolve(data),
          (err: CaptureError) => console.error(reject(err))
        );})
    return promise;
  }
  toBase64(filepath):Promise<any>{
    let promise=new Promise((resolve,reject)=> {
      let filePath: string = filepath;
      this.base64.encodeFile(filePath).then((base64File: string) => {
 //    this.file.readAsDataURL(filePath, 'file').then(res=>{
 //        console.log('file 64',res)
 // resolve(res)
 //    })

        resolve(base64File)
        // console.log(base64File);
      }, (err) => {
        reject(err)
        console.log(err);
      });
    });
    return promise
  }
  getVerses():Observable<any>{
    return this.http.get(this.verseUrl).map((res) => res.json());
  }

  getAyat(versid):Observable<any>{
    return this.http.get(this.AyatUrl+versid).map((res) => res.json());
  }

  getAyaInfo(suraid , ayaid):Observable<any>{
    return this.http.get(this.getAyaUrl+ayaid+"/"+suraid).map((res) => res.json());
  }
  getGozaaSoura(gozzaid) :Observable<any>{

    return this.http.get(this.gozaaUrl+gozzaid).map((res) => res.json());
  }

  getAyaSearch(text){
   let body = {
    textofaya : text
   }
    return this.http.post(this.serachbyaya,body).map((res)=>res.json());
  }

  getSouraSearch(text){
    console.log("this text from ",text)
    let body = {
      verses_name : text
   }
   console.log("this text from ",body)
  return this.http.post(this.serachbysoura,body).map((res)=>res.json());
  }
}
