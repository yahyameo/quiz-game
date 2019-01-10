import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Navbar, AlertController } from 'ionic-angular';
import { CommonService } from "../../providers/common-service/common-service";
import { QuizService } from "../../providers/quiz-service/quiz-service";
import { SelectGamePage } from "../select-game/select-game";

/**
 * Generated class for the CoinsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coins',
  templateUrl: 'coins.html',
})
export class CoinsPage {
  @ViewChild(Navbar) navBar: Navbar;

  user:any;
  totalCoinBalance:any;
  coinsLog:any;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public commonService:CommonService,
  public quizService:QuizService,
  public platform:Platform,
  public alertCtrl:AlertController) {
      this.user=this.commonService.getUserInfo(); 
      this.loadCoinsBalance();
      this.loadCoinLog();
      this.setBackButtonPressEvent();
  }
  setBackButtonPressEvent() {
    this.platform.registerBackButtonAction(() => {
      this.navCtrl.push(SelectGamePage);
    }, 1);
  }
  setBackButtonAction() {
    this.navBar.backButtonClick = () => {
      this.navCtrl.push(SelectGamePage);
    }
  }
loadCoinsBalance(){
  this.quizService.getWalletBalance().subscribe(data=>{
this.totalCoinBalance=data["data"]["coins"];
  },error=>{

  })
}
redeemCoinPopup() {
    let confirm = this.alertCtrl.create({
      title: 'Redeem Coins',
      inputs: [
        {
          type: 'number',
          name: 'txtCoins',
          placeholder: 'Enter coins',
          id: 'txtCoins',

        }],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {

          }
        },
        {
          text: 'Submit',
          handler: () => {
            let coins=parseFloat(document.getElementById("txtCoins")['value']);
            this.redeem(coins);
          }
        }
      ]
    });
    confirm.present();
  }
redeem(coins:any){
  this.commonService.showLoading();
  this.quizService.convertCoinToWallet(coins).subscribe(
    data=>{
  this.commonService.messagePopup(data["message"]);
  this.commonService.hideLoading();
  if(data["success"]){
    this.loadCoinsBalance();
  }
    },error=>{
this.commonService.messagePopup("An error occurred while processing your request");
this.commonService.hideLoading();
    }
  )
}
 
loadCoinLog(){
  this.quizService.getCoinWalletLog()
  .subscribe(data=>{
this.coinsLog=data["data"];
  },error=>{
    console.log(error);
  })
}
  ionViewDidLoad() {
    this.setBackButtonAction() 
    console.log('ionViewDidLoad CoinsPage');
  }

}
