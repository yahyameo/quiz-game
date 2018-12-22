import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestionsPage } from "../questions/questions";
import { CheckPaymentPage } from "../check-payment/check-payment";

@IonicPage()
@Component({
  selector: 'page-clubs',
  templateUrl: 'clubs.html',
})
export class ClubsPage {
clubsList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.loadClubs();
  }
  loadClubs(){
    this.clubsList=[
      {"name":"Free Club","prize":100,"joiningFee":0,"free":true},
      {"name":"Bronze Club","prize":500,"joiningFee":200},
      {"name":"Silver Club","prize":1000,"joiningFee":500},
      {"name":"Gold Club","prize":1500,"joiningFee":1000},
      {"name":"Diamond Club","prize":3000,"joiningFee":1500},
      {"name":"Platinum Club","prize":5000,"joiningFee":2000},
    ]
  }
  goToQuestion(club:any) {
    localStorage.setItem("selectedClub",JSON.stringify(club));
    if(club.free)
       this.navCtrl.push(QuestionsPage);
    else
       this.navCtrl.push(CheckPaymentPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubsPage');
  }

}
