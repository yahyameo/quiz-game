import { Component, Output } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestionsPage } from "../questions/questions";
import { CheckPaymentPage } from "../check-payment/check-payment";
import { QuizService } from "../../providers/quiz-service/quiz-service";
import { WalletBuyPlanPage } from "../wallet-buy-plan/wallet-buy-plan";
import { CommonService } from "../../providers/common-service/common-service";

@IonicPage()
@Component({
  selector: 'page-clubs',
  templateUrl: 'clubs.html',
})
export class ClubsPage {
  clubsList: any = [];
  walletBalance: any = { balance: null, coins: null };
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public quizService: QuizService,
    public commonService: CommonService) {
    this.loadClubs();
    this.getWalletBalance();
  }
  loadClubs() {
    this.commonService.showLoading();
    this.quizService.getCategory().subscribe(data => {
      this.clubsList = data["data"];
      this.commonService.hideLoading();
    }, error => {
      console.log(error)
      this.commonService.hideLoading();
    })
  }
  getWalletBalance() {
    this.quizService.getWalletBalance().subscribe(data => {
      this.walletBalance = data["data"];
    }, error => {

    })
  }
  goToQuestion(club: any) {
    localStorage.setItem("selectedClub", JSON.stringify(club));
    if (parseFloat(club["joining_fee"]) == 0 || parseFloat(this.walletBalance["coins"]) >= parseFloat(club["joining_fee"])) {
      this.navCtrl.push(QuestionsPage);
    }
    else
    { 
      let coinsToBuy=parseFloat(club["joining_fee"])-this.walletBalance["coins"];
      let amount=(coinsToBuy*30)/100;
      this.navCtrl.push(CheckPaymentPage, {"amount":amount,"returnToStartQuiz": true,"coins":coinsToBuy }); 
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubsPage');
  }

}
