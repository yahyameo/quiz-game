import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, Navbar } from 'ionic-angular';
import { QuizService } from "../../providers/quiz-service/quiz-service";
import { CommonService } from "../../providers/common-service/common-service";
import { WalletBuyPlanPage } from "../wallet-buy-plan/wallet-buy-plan";
import { CheckPaymentPage } from "../check-payment/check-payment";
import { SelectGamePage } from "../select-game/select-game";
import { WithdrawalLogPage } from "../withdrawal-log/withdrawal-log";

/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
  @ViewChild(Navbar) navBar: Navbar;
  user:any;
  totalBalance:any;
  walletLog:any;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
   public commonService:CommonService,
   public platform: Platform,
  public quizService:QuizService,
  public alertCtrl:AlertController) {
    this.user=this.commonService.getUserInfo(); 
    this.loadWalletLog();
    let amountAdded=this.navParams.get('amountAdded');
    if(amountAdded){
      this.commonService.messagePopup("Rs. "+amountAdded+" has been added to your wallet");
    }
    this.setBackButtonPressEvent();
  }

  ionViewDidLoad() {
    this.setBackButtonAction();
    console.log('ionViewDidLoad WalletPage');
  }
addMoney(){
  this.openAddMoneyPopup();
}
gotToBuyPlan(){
  this.navCtrl.push(WalletBuyPlanPage);
}
withdraw(){
  this.navCtrl.push(WithdrawalLogPage);
}
openAddMoneyPopup() {
    let confirm = this.alertCtrl.create({
      title: 'Add Money',
      inputs:[
      {
        type:'number',
        name:'txtAddMoney',
        placeholder:'Enter money',
        id:'txtAddMoney',
        
      }],
      buttons: [
        {
          text: 'Close',
          handler: () => {
        
          }
        },
        {
          text: 'Submit',
          handler: () => {
            var amountToAdd=  document.getElementById("txtAddMoney")["value"];
            this.navCtrl.push(CheckPaymentPage,{"amount":amountToAdd,"convertToCoin":false,"hideWalletMoneyChkBox":true})
          }
        }
      ]
    });
    confirm.present();
  }
loadWalletLog(){
  this.quizService.getWalletLog()
  .subscribe(data=>{
this.walletLog=data["data"];
  },error=>{
    console.log(error);
  })
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
}
