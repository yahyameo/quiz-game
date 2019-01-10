import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Navbar } from 'ionic-angular';
import { SelectGamePage } from "../select-game/select-game";
import { CommonService } from "../../providers/common-service/common-service";
import { ReviewAnswerPage } from "../review-answer/review-answer";
import { QuizService } from "../../providers/quiz-service/quiz-service";

/**
 * Generated class for the TryAgainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-try-again',
  templateUrl: 'try-again.html',
})
export class TryAgainPage {
  @ViewChild(Navbar) navBar: Navbar;
  user: any;
  modal: any;
  totalQuestions: any;
  rightAnswer: any;
  timeout: boolean;
  selectedClub:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonService: CommonService, 
    public platform: Platform,
    public quizService:QuizService) {
    this.setBackButtonPressEvent();
    this.user = this.commonService.getUserInfo();
    this.totalQuestions = parseInt(localStorage.getItem("totalQuestions"));
    this.rightAnswer = parseInt(localStorage.getItem("rightAnswer"));
    this.timeout = JSON.parse(localStorage.getItem("timeout"));
    this.selectedClub=this.commonService.getSelectedClubInfo();
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
  ionViewDidLoad() {
    this.setBackButtonAction();
    console.log('ionViewDidLoad TryAgainPage');
  }
  goToSelectGame() {
    this.navCtrl.push(SelectGamePage);
  }
  goToReviewAnswer() {
    this.navCtrl.push(ReviewAnswerPage);
  }
  backButtonAction() {
  }
  ionViewWillLeave() {
  // this.navCtrl.push(SelectGamePage);
  }
}
