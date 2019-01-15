import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MakePaymentPage } from "../make-payment/make-payment";
import { CommonService } from "../../providers/common-service/common-service";
import { QuizService } from "../../providers/quiz-service/quiz-service";

/**
 * Generated class for the CheckPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-check-payment',
  templateUrl: 'check-payment.html',
})
export class CheckPaymentPage {
  selectedClub: any;
  walletBalance: any={"balance":null,"coins":0};
  requestData: any;
  includeWalletMoney:boolean;
  hideWalletMoneyChkBox:boolean;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public commonService: CommonService,
    public quizService: QuizService) {
    this.selectedClub = this.commonService.getSelectedClubInfo();
    let amount = this.navParams.get('amount');
    let convertToCoin = this.navParams.get('convertToCoin');
    let coins = this.navParams.get('coins');
    this.hideWalletMoneyChkBox=this.navParams.get('hideWalletMoneyChkBox');
    this.requestData = { "amount": amount, "coins": coins,"convertToCoin":convertToCoin,"offers":this.navParams.get("offers") }
    this.loadWalletBalance();
  }
  loadWalletBalance() {
    this.quizService.getWalletBalance().subscribe(data => {
      this.walletBalance = data["data"];
    }, error => {

    })
  }
  goToMakePayment() {
    if(this.includeWalletMoney)
      { this.requestData.amount=this.requestData.amount-this.walletBalance.balance;
      }
    let returnToStartQuiz=this.navParams.get('returnToStartQuiz');
    this.navCtrl.push(MakePaymentPage, { "amount": this.requestData.amount, 
    "convertToCoin": this.requestData.convertToCoin, "coins": this
    .requestData.coins,"returnToStartQuiz":returnToStartQuiz,"offers":this.requestData.offers });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckPaymentPage');
  }

}
