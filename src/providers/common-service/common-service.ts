import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, Loading, LoadingController, AlertController } from "ionic-angular";
import { Subject } from "rxjs/Subject";

/*
  Generated class for the CommonServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonService {
  private notify = new Subject<any>();
  notifyObservable$ = this.notify.asObservable();
  userChoosenAns: any = [];
  correctAnswer: any = [];
  questionList: any;
  loading:Loading;
  constructor(private toastCtrl: ToastController, public http: HttpClient,
   private loadingCtrl: LoadingController,
   public alertCtrl:AlertController) {

  }
  public notifyWhenBalanceChange() {
      this.notify.next();
  }
  setQuestionsList (questionList:any){
    this.questionList=questionList;
  }
  getQuestionsList() {
    return this.questionList;
  }
  setUserChoosenAnswer(userChoosenAns: any) {
    this.userChoosenAns = userChoosenAns;
  }
  getUserChoosenAnswer() {
    return this.userChoosenAns;
  }
  setCorrectAnswer(correctAnswer: any) {
    this.correctAnswer = correctAnswer;
  }
  getCorrectAnswer() {
    return this.correctAnswer;
  }
  getUserInfo() {
    var user = JSON.parse(localStorage.getItem("user"));
    return user;
  }
  getSelectedClubInfo() {
    var data = JSON.parse(localStorage.getItem("selectedClub"));
    return data;
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: false
    });
    this.loading.present();
  }
  messagePopup(message:any) {
    let confirm = this.alertCtrl.create({
      message: message,
      buttons: [
        {
          text: 'Close',
          handler: () => {

          }
        }
      ]
    });
    confirm.present();

  }
  hideLoading(){
     this.loading.dismiss();
  }
  presentToast(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'top',
      showCloseButton:true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
