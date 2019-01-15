import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { QuizService } from "../../providers/quiz-service/quiz-service";
import { CommonService } from "../../providers/common-service/common-service";
import { ProfilePage } from "../profile/profile";

/**
 * Generated class for the WithdrawalLogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-withdrawal-log',
  templateUrl: 'withdrawal-log.html',
})
export class WithdrawalLogPage {
  withdrawalLog: any;
  user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public quizService: QuizService,
    public alertCtrl: AlertController,
    public commonService: CommonService) {
    this.user = this.commonService.getUserInfo();
    this.getWithdrawalLog();
  }
  getWithdrawalLog() {
    this.quizService.getWithdrawalLog()
      .subscribe(data => {
        this.withdrawalLog = data["data"];
      }, error => {
        console.log(error);
      })
  }
  openWithdrawalPopup() {
    if (this.user["bank_details"].length == 0) {
      this.checkBankDetailPopup();
      return false;
    }
    let confirm = this.alertCtrl.create({
      title: 'Withdraw money',
      inputs: [
        {
          type: 'number',
          name: 'txtwithdrawMoney',
          placeholder: 'Enter money',
          id: 'txtwithdrawMoney',

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
            this.commonService.showLoading();
            var amountToWithdraw = document.getElementById("txtwithdrawMoney")["value"];
            this.quizService.withdraw(amountToWithdraw).subscribe(data => {
              if(data["success"]) this.commonService.notifyWhenBalanceChange();
              this.commonService.messagePopup(data["message"]);
              this.commonService.hideLoading();
            }, error => {
              this.commonService.hideLoading();
            })
          }
        }
      ]
    });
    confirm.present();
  }
  checkBankDetailPopup() {
    let confirm = this.alertCtrl.create({
      title: 'Bank details not added',
      buttons: [
        {
          text: 'Close',
          handler: () => {

          }
        },
        {
          text: 'Add Now',
          handler: () => {
            this.navCtrl.push(ProfilePage);
          }
        }
      ]
    });
    confirm.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawalLogPage');
  }
  ionViewWillEnter() {
         this.user=this.commonService.getUserInfo();
  }

}
