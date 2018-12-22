import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CongratulationPage } from "../congratulation/congratulation";
import { TryAgainPage } from "../try-again/try-again";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { CommonService } from "../../providers/common-service/common-service";

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
  timerLimit: any = 30;
  maxTime: any = this.timerLimit;
  timer: any;
  hidevalue: any;
  slideOptions: any;
  selectedOptBgImg: any;
  flashCardFlipped: boolean = false;
  portrait: boolean = true;
  correctAnswer: any[] = ["Markoni", "Antarctica", "Indonesia",
    "UAE", "Gevora Hotel (Dubai)", "Nippon", "Trans-Canada", "Qzone", "Zeeshan Akhtar"]
  userChoosenAns: any[] = [];
  questionList: any[] = [
    {
      "question": "Who invented radio ________",
      "options": ["Markoni", "Newton", "Einstine", "Mandleve"]
    },
    {
      "question": "The largest cold desert of the world is in ___________",
      "options": ["Europe", "Antarctica", "Africa", "Asia"]
    },
    {
      "question": "Which country has the most number of active volcanoes in the world?",
      "options": ["Indonesia", "Pakistan", "India", "UK"]
    },
    {
      "question": "Which country has world’s longest zipline?",
      "options": ["UAE", "India", "Germany", "Russia"]
    },
    {
      "question": "The world’s tallest hotel is _____________?",
      "options": ["JW Marriott Marquis Hotel (Dubai)", "Gevora Hotel (Dubai)", "Marriott Marquis (NY)", "The Venetian (USA)"]
    },
    {
      "question": "The Japanese call their country as __________?",
      "options": ["Nikon", "Nippon", "Chingcho", "Ninja"]
    },
    {
      "question": "Which of the following is the longest highway _____________?",
      "options": ["Karakoram Highway", "Trans-Canada", "Highway 401", "Leh-Manali Highway"]
    },
    {
      "question": "Which of the following is not a search engine?",
      "options": ["Yahoo", "Qzone", "Bing", "Baidu"]
    },
    {
      "question": "Who is the current CEO of Q-Mobile?",
      "options": ["Anwar Saifullah Khan", "Zeeshan Akhtar", "Jawed Iqbal", "Wang Xiu Ying"]
    },
  ];
  currentQuestionIndex: any = 0;
  user: any;
  progress: any;
  selectedClub: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonService: CommonService,
    private screenOrientation: ScreenOrientation) {
    this.user = this.commonService.getUserInfoByKey();
    this.progress = 100 * ((this.questionList.length - this.userChoosenAns.length) / this.questionList.length);
    this.startTimer();
    localStorage.setItem("totalQuestions", this.questionList.length.toString());
    this.screenOrientation.onChange().subscribe(
      () => {
        this.portrait = !this.portrait;
      }
    );
    this.selectedClub = commonService.getSelectedClubInfo();
  }

  selectAnswer(id: any) {
    localStorage.setItem("timeout", JSON.stringify(false));
    var answer = this.questionList[this.currentQuestionIndex].options[id];
    this.selectedOptBgImg = 'url(../../assets/icon/right-ans.png)';
    document.getElementById("opt_" + id).style.backgroundColor = "limegreen";
    setTimeout(x => {
      this.loadNextQuestion(answer);
         document.getElementById("opt_" + id).style.backgroundColor = null;
    }, 1000);
  }
  loadNextQuestion(answer: any) {
    this.maxTime = this.timerLimit;
    this.currentTimerValue = 0;
    clearInterval(this.timer);
    this.startTimer();
    if (this.currentQuestionIndex != this.questionList.length - 1) {
      this.currentQuestionIndex++;
      this.userChoosenAns.push(answer);
    }
    else {
      this.userChoosenAns.push(answer);
      this.checkRightAnswer();
      let totalQuestions = parseInt(localStorage.getItem("totalQuestions"));
      let rightAnswer = parseInt(localStorage.getItem("rightAnswer"));
      if (totalQuestions != rightAnswer)
        this.navCtrl.push(TryAgainPage);
      else
        this.navCtrl.push(CongratulationPage);

    }
    this.progress = 100 * ((this.questionList.length - this.userChoosenAns.length) / this.questionList.length);
  }
  checkRightAnswer() {
    var rightAnswer = 0;
    for (var i = 0; i < this.questionList.length; i++) {
      if (this.correctAnswer[i] == this.userChoosenAns[i]) {
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsPage');
  }

}
