import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { QuizService } from "../../providers/quiz-service/quiz-service";
import { CommonService } from "../../providers/common-service/common-service";
import { CheckPaymentPage } from "../check-payment/check-payment";
import { HomePage } from "../home/home";
import { QuestionsPage } from "../questions/questions";

/**
 * Generated class for the WalletBuyPlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-buy-plan',
  templateUrl: 'wallet-buy-plan.html',
})
export class WalletBuyPlanPage {
  buyPlans: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public quizService: QuizService,
    public commonService: CommonService,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController) {
    this.loadBuyPlans();
  }
  loadBuyPlans() {
    this.buyPlans = [
      { "amount": 150, "coins": 500 },
      { "amount": 290, "coins": 1000 },
      { "amount": 427, "coins": 1500 },
      { "amount": 560, "coins": 2000 },
      { "amount": 810, "coins": 3000 },
      { "amount": 1250, "coins": 5000 },
    ]
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletBuyPlanPage');
  }
  selectedPlan: any;
  buyManually() {
    this.addCoinManually();
  }
  addCoinManually() {
    let confirm = this.alertCtrl.create({
      title: 'Add coins manually',
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
            let coins = parseFloat(document.getElementById("txtCoins")['value']);
            let amount = (coins * 30 / 100);
            this.selectedPlan = { "amount": amount, "coins": coins }
            // this.navCtrl.push(CheckPaymentPage,{"amount":amount,"convertToCoin":true})
            this.buy(this.selectedPlan,0);
          }
        }
      ]
    });
    confirm.present();
  }
  buy(plan: any,offers:any) {
    this.commonService.showLoading();
    this.selectedPlan = plan;
    this.quizService.convertWalletToCoin(plan["coins"],offers).subscribe(data => {
      this.commonService.hideLoading();
      if (data["success"]) {
        this.commonService.notifyWhenBalanceChange();
        this.commonService.messagePopup(this.selectedPlan.coins + " " + data["message"]);
        let returnToStartQuiz = this.navParams.get('returnToStartQuiz');
        if (returnToStartQuiz) {
          this.quizService.getWalletBalance().subscribe(data => {
            let joinFee=parseInt(this.commonService.getSelectedClubInfo()["joining_fee"]);
            if (data["data"]["coins"]>=joinFee) {
              this.navCtrl.push(QuestionsPage);
            }
          }, error => {

          })
        }
      }
      else {
        this.buyPopup(data["message"],offers);

      }
    }, error => {
      console.log(error);
      this.commonService.hideLoading();
    })
  }
  toast: any;
  buyPopup(message,offers) {
    let confirm = this.alertCtrl.create({
      message: message,
      buttons: [
        {
          text: 'Close',
          handler: () => {

          }
        },
        {
          text: 'Buy',
          handler: () => {
            var amountToAdd = this.selectedPlan.amount;
            let returnToStartQuiz = this.navParams.get('returnToStartQuiz');
            this.navCtrl.push(CheckPaymentPage, { "amount": amountToAdd, "convertToCoin": true, "coins": this.selectedPlan.coins, "returnToStartQuiz": returnToStartQuiz,"offers":offers })
          }
        }
      ]
    });
    confirm.present();

  }
}
