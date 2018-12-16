import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RedeemPage } from "../redeem/redeem";

/**
 * Generated class for the CongratulationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-congratulation',
  templateUrl: 'congratulation.html',
})
export class CongratulationPage {
points:number;
totalQuestions:any;
rightAnswer:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
 this.totalQuestions=localStorage.getItem("totalQuestions");
 this.rightAnswer=localStorage.getItem("rightAnswer");
 this.points=parseInt(this.rightAnswer)*5;
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CongratulationPage');
  }
goToRedeem(){
  this.navCtrl.push(RedeemPage);
}
}
