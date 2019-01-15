import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { QuestionsPage } from "../questions/questions";
import { QuizService } from "../../providers/quiz-service/quiz-service";
import { CommonService } from "../../providers/common-service/common-service";
import { WalletPage } from "../wallet/wallet";
import { HomePage } from "../home/home";

/**
 * Generated class for the MakePaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-make-payment',
  templateUrl: 'make-payment.html',
})
export class MakePaymentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public quizService: QuizService,
    public commonService: CommonService) {
  }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
      this.addWalletBalance();
    }, 5000);
  }
  addWalletBalance() {
    let selectedClub = this.commonService.getSelectedClubInfo();
    let amount = this.navParams.get('amount');
    let convertToCoin = this.navParams.get('convertToCoin');
    let coins = this.navParams.get('coins');
    let offers=this.navParams.get("offers")?this.navParams.get("offers"):0;
    this.quizService.addWallet(amount).subscribe(data => {
      if (convertToCoin) {
        this.quizService.convertWalletToCoin(coins,offers).subscribe(data => {
          this.commonService.notifyWhenBalanceChange();
          let returnToStartQuiz = this.navParams.get('returnToStartQuiz');
          if (returnToStartQuiz) {
            this.quizService.getWalletBalance().subscribe(data => {
              let joinFee = parseInt(this.commonService.getSelectedClubInfo()["joining_fee"]);
              if (data["data"]["coins"] >= joinFee) {
                this.navCtrl.push(QuestionsPage);
              }
            }, error => {

            })
          }
          else {
            this.navCtrl.push(WalletPage);
          }
        }, error => {
          console.log(error);
        })
      }
      else {
        this.commonService.notifyWhenBalanceChange();
        this.navCtrl.push(WalletPage, { "amountAdded": amount })
      }
    }, error => {
      console.log(error);
    })
  }
  goToQuestion() {
    this.presentLoadingDefault();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MakePaymentPage');
  }

}
