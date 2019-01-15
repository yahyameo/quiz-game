import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, Platform, Navbar, AlertController } from 'ionic-angular';
import { CongratulationPage } from "../congratulation/congratulation";
import { TryAgainPage } from "../try-again/try-again";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { CommonService } from "../../providers/common-service/common-service";
import { QuizService } from "../../providers/quiz-service/quiz-service";
import { SelectGamePage } from "../select-game/select-game";

/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {
  @ViewChild('slides') slides: any;
  @ViewChild(Navbar) navBar: Navbar;
  unregisterBackButtonAction: any;
  timerLimit: any = 30;
  maxTime: any = this.timerLimit;
  timer: any;
  hidevalue: any;
  slideOptions: any;
  flashCardFlipped: boolean = false;
  portrait: boolean = true;
  correctAnswer: any = {};
  userChoosenAns: any[] = [];
  questionList: any[] = [];
  currentQuestionIndex: any = 0;
  user: any;
  progress: any;
  selectedClub: any;
  errorMsg: any = null;
  loading: Loading;
  levelId: any;
  categoryId: any;
  questionIds:any=[];
  walletBalance: any = { balance: null, coins: null };
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonService: CommonService,
    private screenOrientation: ScreenOrientation,
    public quizService: QuizService, private loadingCtrl: LoadingController,
    private platform: Platform,
    public alertCtrl: AlertController) {
    this.user = this.commonService.getUserInfo();
    this.progress = 100 * ((this.userChoosenAns.length) / this.questionList.length);
    this.setOreintation();
    this.selectedClub = commonService.getSelectedClubInfo();
    this.loadQuestions();
    this.setBackButtonPressEvent();
  }
  ionViewWillLeave() {
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }
  setBackButtonPressEvent() {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
      this.confirmPopup()
    }, 1);
  }
  setOreintation() {
    this.screenOrientation.onChange().subscribe(
      () => {
        this.portrait = !this.portrait;
      }
    );
  }
  loadWalletBalance() {
    this.quizService.getWalletBalance().subscribe(data => {
      this.walletBalance = data["data"];
    }, error => {

    })
  }
  dummyQuestion() {
    this.questionList = [
      {
        "id": 2,
        "level_id": "1",
        "question": "Who invented radio ________",
        "option_1": "Markoni",
        "option_2": "Newton",
        "option_3": "Einstine",
        "option_4": "Mandleve"
      },
      {
        "id": 1,
        "level_id": "1",
        "question": "What type of component might add USB ports to a desktop computer?",
        "option_1": "eGPU",
        "option_2": "SSD",
        "option_3": "Memory module",
        "option_4": "Expansion card"
      }
    ];
    this.commonService.setQuestionsList(this.questionList)
    localStorage.setItem("totalQuestions", this.questionList.length.toString());
  }
  getAnswers(answer:any) {
    this.quizService.getAnswers(this.levelId, this.questionIds).subscribe(
      data => {
      var result = data["data"];
      this.correctAnswer = result;
      this.commonService.setCorrectAnswer(this.correctAnswer);
      this.userChoosenAns.push(answer);
      this.commonService.setUserChoosenAnswer(this.userChoosenAns);
      this.checkRightAnswer();
      let totalQuestions = parseInt(localStorage.getItem("totalQuestions"));
      let rightAnswer = parseInt(localStorage.getItem("rightAnswer"));
      let percentage = 100 * (rightAnswer / totalQuestions)
      this.saveAnswerResult(percentage);
      if (totalQuestions != rightAnswer)
        this.navCtrl.push(TryAgainPage);
      else
        this.navCtrl.push(CongratulationPage);
      }, error => {
        console.log(error);
      });
  }
  loadQuestions() {
    this.showLoading();
    let categoryId = this.commonService.getSelectedClubInfo()["id"];
    this.categoryId = categoryId;
    this.quizService.getLevelId(categoryId).subscribe(
      data => {
        if (data["success"]) {
          let levelId = data["data"]["user_level_id"];
          this.levelId = levelId;
          this.quizService.getQuestionList(categoryId, levelId).subscribe(
            data => {
              if (data["success"]) this.commonService.notifyWhenBalanceChange();
              this.loadWalletBalance();
              this.commonService.setQuestionsList(data["data"]);
              this.questionList = data["data"];
              localStorage.setItem("totalQuestions", this.questionList.length.toString());
              this.startTimer();
              console.log(data);
              this.hideLoading();
              // let id = [];
              // for (var i = 0; i < this.questionList.length; i++) {
              //   id.push(this.questionList[i]["id"])
              // }
              // this.quizService.getAnswers(levelId, id).subscribe(
              //   data => {
              //     var result = data["data"];
              //     this.correctAnswer = result;
              //     this.commonService.setCorrectAnswer(this.correctAnswer);
              //   }, error => {
              //     console.log(error);
              //   });
            },
            error => {
              console.log("Error", error);
              this.hideLoading();
            }
          );
        }
        else {
          this.errorMsg = data["message"];
          this.hideLoading();
        }
      },
      error => {
        console.log("Error", error);
        this.hideLoading();
      }
    );
  }
  loadAnswer() {

  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: false
    });
    this.loading.present();
  }
  hideLoading() {
    this.loading.dismiss();
  }
  lockOptions: boolean;
  selectAnswer(id: any) {
    if (this.lockOptions)
    { return false; }
    this.lockOptions = true;
    localStorage.setItem("timeout", JSON.stringify(false));
    var questionId = this.questionList[this.currentQuestionIndex]["id"];
    this.questionIds.push(questionId);
    var obj = { "id": questionId, "answerId": id };
    document.getElementById("opt_" + id).style.backgroundColor = "limegreen";
    setTimeout(x => {
      this.loadNextQuestion(obj);
      document.getElementById("opt_" + id).style.backgroundColor = null;
      this.lockOptions = false;
    }, 1000);
  }
  loadNextQuestion(answer: any) {
    this.maxTime = this.timerLimit;
    this.currentTimerValue = 0;
    clearInterval(this.timer);
    if (this.currentQuestionIndex != this.questionList.length - 1) {
      this.startTimer();
      this.currentQuestionIndex++;
      this.userChoosenAns.push(answer);
    }
    else {
      this.getAnswers(answer);
    }
    this.progress = 100 * ((this.userChoosenAns.length) / this.questionList.length);
  }
  saveAnswerResult(percentage) {
    this.quizService.saveAnswerResult(this.levelId, this.categoryId, percentage)
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      })
  }
  checkRightAnswer() {
    var rightAnswer = 0;
    for (var i = 0; i < this.questionList.length; i++) {
      let id = this.userChoosenAns[i]["id"];
      if (this.correctAnswer[id] == this.userChoosenAns[i]["answerId"]) {
        rightAnswer++;
      }
    }
    localStorage.setItem("rightAnswer", rightAnswer.toString());
  }
  currentTimerValue: any = 0;
  startTimer() {
    this.timer = setTimeout(x => {
      //  if (this.maxTime <= 0) { }
      this.maxTime -= 1;
      this.currentTimerValue += 1;
      if (this.maxTime >= 0) {
        this.hidevalue = false;
        this.startTimer();
      }

      else {
        localStorage.setItem("timeout", JSON.stringify(true));
        this.hidevalue = true;
        this.navCtrl.push(TryAgainPage);
      }

    }, 1000);


  }
  confirmPopup() {
    let confirm = this.alertCtrl.create({
      title: 'Please Confirm',
      message: "Do you want to exit ?",
      buttons: [
        {
          text: 'NO',
          handler: () => {

          }
        },
        {
          text: 'YES',
          handler: () => {
            this.navCtrl.push(SelectGamePage);
            clearInterval(this.timer);
          }
        }
      ]
    });
    confirm.present();
  }
  ionViewDidLoad() {
    // this.setBackButtonAction();
    console.log('ionViewDidLoad QuestionsPage');
  }

}
